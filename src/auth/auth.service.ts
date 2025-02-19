import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto, LoginAdminDto } from 'src/admin/admin.dto';
import { AdminService } from 'src/admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { AdminDocument } from 'src/admin/schema/admin.schema';
import { Msgs } from 'src/lib/messages';
import { BrevoService } from 'src/notifications/email/brevo.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly brevoService: BrevoService,
    private readonly configService: ConfigService,
  ) {}

  async create(createAdminData: CreateAdminDto) {
    const email = createAdminData.email.toLowerCase();
    const admin = await this.adminService.findOneByEmail(email, ['email']);

    if (admin) {
      throw new ConflictException(Msgs.ADMIN_ALREADY_EXISTS(email));
    }
    const data = await this.adminService.create(createAdminData);

    await this.brevoService.sendOtpEmail({
      recipientEmail: email,
      otp: await this.adminService.generateToken(email),
      recipientName: `${createAdminData.firstName} ${createAdminData.lastName}`,
    });

    return data;
  }

  async login(loginAdminDto: LoginAdminDto) {
    const email = loginAdminDto.email.toLowerCase();
    const admin = await this.adminService.findOneByEmail(email, ['email']);

    if (!admin) {
      throw new ConflictException(Msgs.ADMIN_NOT_FOUND(email));
    }
    const token = await this.generateToken(admin._id, admin.email);

    await this.brevoService.sendOtpEmail({
      recipientEmail: admin.email,
      otp: await this.adminService.generateToken(email),
      recipientName: `${admin.firstName} ${admin.lastName}`,
    });
    return { admin, token };
  }
  async confirmOTP(otp, email) {
    // const email = "mail@mail.com"
    await this.adminService.verifyToken(email, otp);
    return { message: 'OTP confirmed successfully' };
  }

  async generateToken(id: AdminDocument['_id'], email: AdminDocument['email']) {
    const payload = { sub: id, email };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });
  }
}
