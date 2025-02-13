import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FilterQuery, Model } from 'mongoose';
import { VendorDocument } from './schema/vendor.schema';
import { CreateVendorDto } from './vendor.dto';
@Injectable()
export class VendorService {
    constructor(@InjectModel('Admin') private vendorModel: Model<VendorDocument>){
        
    }

    async createVendor(createdVendorDto: CreateVendorDto): Promise<VendorDocument> {
        try {
            const vendorData = { ...createdVendorDto, password: this.generateRandomPassword() };
            const createdVendor = new this.vendorModel(vendorData);
            return await createdVendor.save();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
      }
    
      async getTotalVendorsByDateRange(startDate: Date, endDate: Date): Promise<number> {
        try {
          const count = await this.vendorModel.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate },
          }as any);
          return count;
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      }

      async getVendors(
        page: number = 1,
        limit: number = 10,
        search: string = '',
        category: string = '',
        subCategory: string = '',
        status: string = '',
      ): Promise<{ vendors: VendorDocument[]; totalCount: number }> {
        try {
          const skip = (page - 1) * limit;
          const filter: FilterQuery<VendorDocument> = {};
    
          if (category) {
            filter.category = category;
          }
          if (subCategory) {
            filter.subCategory = subCategory;
          }
          if (status) {
            filter.accountStatus = status;
          }
    
          if (search) {
            filter.$or = [
              { businessName: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } },
              { address: { $regex: search, $options: 'i' } },
            ];
          }
    
          const vendors = await this.vendorModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .exec();
    
          const totalCount = await this.vendorModel.countDocuments(filter);
    
          return { vendors, totalCount };
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      }

      private generateRandomPassword(length: number = 12): string {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-`~[]\{}|;\':",./<>?';
        let password = '';
    
        const requirements = [
            /[a-z]/,
            /[A-Z]/,
            /[0-9]/,
            /[!@#$%^&*()_+\-=`~[\]{}\\|;':",./<>?]/
        ];
    
        for (const regex of requirements) {
            let char;
            do {
                char = characters[Math.floor(Math.random() * characters.length)];
            } while (!regex.test(char)); // Keep trying until we have a match
            password += char;
        }
    
        const remainingLength = length - requirements.length;
        for (let i = 0; i < remainingLength; i++) {
            password += characters[Math.floor(Math.random() * characters.length)];
        }
    
        password = password.split('').sort(() => Math.random() - 0.5).join('');
        return password;
      }
}
