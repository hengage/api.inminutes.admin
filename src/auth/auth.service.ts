import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto, LoginAdminDto } from 'src/admin/admin.dto';
import { AdminService } from 'src/admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { AdminDocument } from 'src/admin/schema/admin.schema';
import { Msgs } from 'src/lib/messages';
import { BrevoService } from 'src/notifications/email/brevo.service';
import { ConfigService } from '@nestjs/config';
import { generateOTP, checkOTPValidity } from './auth.lib';

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

    const { otp } = generateOTP();
    await this.adminService.saveOTP(createAdminData.email, otp.toString());

    await this.brevoService.sendOtpEmail({
      recipientEmail: email,
      otp,
      recipientName: `${createAdminData.firstName} ${createAdminData.lastName}`,
    });

    return data;
  }

  async loginRequest(loginAdminDto: LoginAdminDto) {
    const email = loginAdminDto.email.toLowerCase();
    const admin = await this.adminService.findOneByEmail(email, ['email']);

    if (!admin) {
      throw new ConflictException(Msgs.ADMIN_NOT_FOUND(email));
    }

    const { otp } = generateOTP();
    await this.adminService.saveOTP(admin.email, otp.toString());

    await this.brevoService.sendOtpEmail({
      recipientEmail: admin.email,
      otp,
      recipientName: `${admin.firstName} ${admin.lastName}`,
    });

    return {
      success: true,
      message:
        `A 5 digit code has been sent to ${admin.email}. ` +
        `Enter code below to login.`,
      data: { admin },
    };
  }

  async loginConfirm(otp, email) {
    const admin = await this.adminService.findOneByEmail(email, [
      'email',
      'otp',
      'otpTimestamp',
    ]);

    const isValidOTP = checkOTPValidity(otp, admin);

    if (!isValidOTP) {
      throw new UnauthorizedException('Invalid OTP code provided');
    }

    this.adminService.resetOtp(admin.email).catch((err) => {
      console.error('Error resetting OTP:', err);
    });

    const token = await this.generateJWTToken(admin._id, admin.email);

    return {
      message: 'Login succesful',
      success: true,
      data: { admin, token },
    };
  }

  async generateJWTToken(
    id: AdminDocument['_id'],
    email: AdminDocument['email'],
  ) {
    const payload = { sub: id, email };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });
  }
}
