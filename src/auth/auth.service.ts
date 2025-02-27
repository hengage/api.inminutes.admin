import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto, LoginAdminDto } from 'src/admin/admin.dto';
import { AdminService } from 'src/admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { AdminDocument } from 'src/admin/schema/admin.schema';
<<<<<<< HEAD
import { Msgs } from 'src/lib/messages';
import { BrevoService } from 'src/notifications/email/brevo.service';
import { ConfigService } from '@nestjs/config';
||||||| 633ade8
=======
import { Msgs } from 'src/lib/messages';
import { BrevoService } from 'src/notifications/email/brevo.service';
import { ConfigService } from '@nestjs/config';
import { generateOTP, checkOTPValidity } from './auth.lib';
>>>>>>> main

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
<<<<<<< HEAD
    const data = await this.adminService.create(createAdminData);

    await this.brevoService.sendOtpEmail({
      recipientEmail: email,
      otp: await this.adminService.generateToken(email),
      recipientName: `${createAdminData.firstName} ${createAdminData.lastName}`,
    });

    return data;
||||||| 633ade8
    return this.adminService.create(createAdminData);
=======
    const data = await this.adminService.create(createAdminData);

    const { otp } = generateOTP();
    await this.adminService.saveOTP(createAdminData.email, otp.toString());

    await this.brevoService.sendOtpEmail({
      recipientEmail: email,
      otp,
      recipientName: `${createAdminData.firstName} ${createAdminData.lastName}`,
    });

    return data;
>>>>>>> main
  }

  async loginRequest(loginAdminDto: LoginAdminDto) {
    const email = loginAdminDto.email.toLowerCase();
    const admin = await this.adminService.findOneByEmail(email, ['email']);

    if (!admin) {
      throw new ConflictException(Msgs.ADMIN_NOT_FOUND(email));
    }
<<<<<<< HEAD
    const token = await this.generateToken(admin._id, admin.email);

    await this.brevoService.sendOtpEmail({
      recipientEmail: admin.email,
      otp: await this.adminService.generateToken(email),
      recipientName: `${admin.firstName} ${admin.lastName}`,
    });
    return { admin, token };
||||||| 633ade8
    const token = await this.generateToken(admin._id, admin.email);
    return { admin, token };
=======

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
>>>>>>> main
  }
  async confirmOTP(otp, email) {
    // const email = "mail@mail.com"
    await this.adminService.verifyToken(email, otp);
    return { message: 'OTP confirmed successfully' };
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
