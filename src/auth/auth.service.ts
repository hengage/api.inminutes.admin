import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from 'src/admin/admin.dto';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
  constructor(private readonly adminService: AdminService) {}

  async create(createAdminData: CreateAdminDto) {
    return this.adminService.create(createAdminData);
  }
}
