import { Injectable } from '@nestjs/common';
import { CreateAdminDto, UpdateAdminDto } from './admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDocument } from './schema/admin.schema';

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
}
