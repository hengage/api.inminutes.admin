import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto, LoginAdminDto } from 'src/admin/admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createAdminData: CreateAdminDto) {
    return await this.authService.create(createAdminData);
  }

  @Post('login')
  async login(@Body() loginAdminDto: LoginAdminDto) {
    return await this.authService.login(loginAdminDto);
  }
}
