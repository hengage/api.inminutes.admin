import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto, LoginAdminDto } from 'src/admin/admin.dto';
import { OtpConfirmDto } from './auth.dto';
import { AdminRole } from 'src/lib/constants';
import { AuthGuard } from './auth.guard';
import { SuperAdminGuard } from './auth.super-admin.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(AuthGuard, SuperAdminGuard)
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

  @Get('roles')
  @HttpCode(HttpStatus.OK)
  getAdminRoles() {
    return Object.values(AdminRole);
  }
}
