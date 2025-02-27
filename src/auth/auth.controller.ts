import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto, LoginAdminDto } from 'src/admin/admin.dto';
import { OtpConfirmDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createAdminData: CreateAdminDto) {
    return await this.authService.create(createAdminData);
  }

  @Post('login/request')
  @HttpCode(HttpStatus.OK)
  async loginRequest(@Body() loginAdminDto: LoginAdminDto) {
    return await this.authService.loginRequest(loginAdminDto);
  }

  @Post('login/confirm')
  @HttpCode(HttpStatus.OK)
  async loginConfirm(@Request() req, @Body() otpConfirmDto: OtpConfirmDto) {
    return await this.authService.loginConfirm(
      otpConfirmDto.otp,
      otpConfirmDto.email,
    );
  }

  @Post('otp/confirm')
  async confirmOtp(@Request() req, @Body() otpConfirmDto: OtpConfirmDto) {
    return await this.authService.confirmOTP(otpConfirmDto, req.user.email);
  }
}
