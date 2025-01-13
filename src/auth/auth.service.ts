import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from 'src/admin/admin.dto';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
  constructor(private readonly adminService: AdminService) {}

  async create(createAdminData: CreateAdminDto) {
    const admin = await this.adminService.findOneByEmail(
      createAdminData.email,
      ['email'],
    );

    if (admin) {
      throw new ConflictException(
        `Admin  with email '${createAdminData.email}' already exists`,
      );
    }
    return this.adminService.create(createAdminData);
  }
}
