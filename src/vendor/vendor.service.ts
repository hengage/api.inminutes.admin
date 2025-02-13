import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VendorDocument } from './schema/vendor.schema';
@Injectable()
export class VendorService {
    constructor(@InjectModel('Admin') private vendorModel: Model<VendorDocument>){
        
    }

    async createVendor(vendorData: Partial<VendorDocument>): Promise<VendorDocument> {
        try {
          const createdVendor = new this.vendorModel(vendorData);
          return await createdVendor.save();
        } catch (error) {
          // Handle potential errors like duplicate email, validation errors, etc.
          throw new BadRequestException(error.message); // Or a more specific error
        }
      }
    
      async getTotalVendorsByDateRange(startDate: Date, endDate: Date): Promise<number> {
        try {
          const count = await this.vendorModel.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate },
          });
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
}
