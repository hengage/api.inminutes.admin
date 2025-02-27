import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto, UpdateAdminDto } from './admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDocument } from './schema/admin.schema';
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
   * Saves OTP and timestamp for an admin
   * @param email - Admin's email to find their record
   * @param otp - The OTP code to be saved
   * @returns Updated admin document with OTP details
   * @throws Error if admin not found
   */
  async saveOTP(email: AdminDocument['email'], otp: AdminDocument['otp']) {
    const admin = await this.adminModel
      .findOne({ email })
      .select('email otpSecret otp otpTimestamp')
      .exec();
    if (!admin) {
      throw new Error('Admin not found');
    }

    admin.otp = otp;
    admin.otpTimestamp = Date.now();
    await admin.save();

    return admin;
  }

  async resetOtp(email: string) {
    const admin = await this.adminModel
      .findOne({ email })
      .select('email otpSecret otp otpTimestamp');

    if (!admin) {
      throw new Error('Admin not found');
    }

    admin.otp = OTPConstant.RESET_OTP;
    admin.otpTimestamp = OTPConstant.RESET_TIMESTAMP;
    await admin.save();
  }
}
