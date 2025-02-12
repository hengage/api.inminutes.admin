import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto, UpdateAdminDto } from './admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDocument } from './schema/admin.schema';
import { generateOTP, verifyOTP } from 'src/lib/otpToken';
import { Msgs } from 'src/lib/messages';
import { OTPConstant } from 'src/lib/constants';

@Injectable()
export class AdminService {
  constructor(@InjectModel('Admin') private adminModel: Model<AdminDocument>) {}

  create(createAdminData: CreateAdminDto) {
    const createdAdmin = new this.adminModel(createAdminData);
    return createdAdmin.save();
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  async findOneByEmail(
    email: AdminDocument['email'],
    select?: string[] | '',
  ): Promise<AdminDocument | null> {
    return this.adminModel.findOne({ email }).select(select).exec();
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  /**
   * Generates a one-time password (OTP) for an admin.
   * @param email - Admin's email to find their secret key.
   * @returns OTP if secret exists, otherwise an error.
   */
  async generateToken(email: string): Promise<number> {
    const admin = await this.adminModel.findOne({ email });
    if (!admin) {
      throw new Error('Admin not found or OTP secret is missing');
    }

    const { otp, secret } = generateOTP();
    admin.otpSecret = secret;
    admin.otpExpiresAt = OTPConstant.expiresAt;
    await admin.save();

    return otp;
  }

  /**
   * Verifies an OTP using the admin's stored secret key.
   * @param email - Admin's email.
   * @param otp - OTP to be verified.
   * @returns Boolean indicating success or failure.
   */
  async verifyToken(email: string, otp: number): Promise<boolean> {
    const admin = await this.adminModel.findOne({ email }).select('+otpSecret');
    if (!admin || !admin.otpSecret) {
      throw new ConflictException(Msgs.ADMIN_NOT_FOUND(email));
    }
    return verifyOTP(otp, admin.otpSecret);
  }
}
