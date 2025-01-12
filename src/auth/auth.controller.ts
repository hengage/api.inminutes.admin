import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from 'src/admin/admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createAdminData: CreateAdminDto) {
    return await this.authService.create(createAdminData);
  }
}
