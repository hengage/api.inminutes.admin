import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto, LoginAdminDto } from 'src/admin/admin.dto';
import { AdminService } from 'src/admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { AdminDocument } from 'src/admin/schema/admin.schema';
import { Msgs } from 'src/lib/messages';
import { BrevoService } from 'src/notifications/email/brevo.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly brevoService: BrevoService,
  ) {}

  async create(createAdminData: CreateAdminDto) {
    const email = createAdminData.email.toLowerCase();
    const admin = await this.adminService.findOneByEmail(email, ['email']);

    if (admin) {
      throw new ConflictException(Msgs.ADMIN_ALREADY_EXISTS(email));
    }

    await this.brevoService.sendOtpEmail({
      recipientEmail: email,
      otp: '123456',
      recipientName: `${createAdminData.firstName} ${createAdminData.lastName}`,
    });

    return this.adminService.create(createAdminData);
  }

  async login(loginAdminDto: LoginAdminDto) {
    const email = loginAdminDto.email.toLowerCase();
    const admin = await this.adminService.findOneByEmail(email, ['email']);

    if (!admin) {
      throw new ConflictException(Msgs.ADMIN_NOT_FOUND(email));
    }
    const token = await this.generateToken(admin._id, admin.email);
    return { admin, token };
  }

  async generateToken(id: AdminDocument['_id'], email: AdminDocument['email']) {
    const payload = { sub: id, email };
    return this.jwtService.signAsync(payload);
  }
}
