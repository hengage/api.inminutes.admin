import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto, LoginAdminDto } from 'src/admin/admin.dto';
import { OtpConfirmDto } from './auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createAdminData: CreateAdminDto) {
    return await this.authService.create(createAdminData);
  }

  @Post('login/request')
  async loginRequest(@Body() loginAdminDto: LoginAdminDto) {
    return await this.authService.loginRequest(loginAdminDto);
  }

  @Post('login/confirm')
  async loginConfirm(@Request() req, @Body() otpConfirmDto: OtpConfirmDto) {
    return await this.authService.loginConfirm(
      otpConfirmDto.otp,
      otpConfirmDto.email,
    );
  }
}
