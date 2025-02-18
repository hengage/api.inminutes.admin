import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateVendorCategoryDto,
  CreateVendorDto,
  CreateVendorSubCategoryDto,
  UpdateVendorDto,
} from './vendor.dto';
import { ApiService } from 'src/lib/apiCalls';
@Injectable()
export class VendorService {
  constructor(
    private readonly apiService: ApiService) {}

  async createVendor(createVendorDto: CreateVendorDto): Promise<any> {
    try {
      const newCreateVendor = {
        ...createVendorDto,
        password: this.generateRandomPassword(),
      };
      return await this.apiService.post('/vendor/register', newCreateVendor);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateVendor(
    updateVendorDto: UpdateVendorDto,
    vendorId: string,
  ): Promise<any> {
    try {
      return await this.apiService.put(
        `/vendor/update/${vendorId}`,
        updateVendorDto,
      );
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
  ): Promise<any> {
    try {
      const params = { page, limit, search, category, subCategory, status };
      return await this.apiService.get('/admin/vendors', params);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getVendorDetails(vendorId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/vendors/${vendorId}`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async approveOrDisapprove(vendorId: string, approve: boolean): Promise<any> {
    try {
      return await this.apiService.put(`/admin/vendors/${vendorId}/approval`, {
        approve,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createVendorCategory(
    createVendorCategoryDto: CreateVendorCategoryDto,
  ): Promise<any> {
    try {
      return await this.apiService.post(
        '/admin/vendors/category',
        createVendorCategoryDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getVendorCategories(): Promise<any> {
    try {
      return await this.apiService.get('/vendors/category');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createVendorSubCategory(
    createVendorSubCategoryDto: CreateVendorSubCategoryDto,
  ): Promise<any> {
    try {
      return await this.apiService.post(
        '/admin/vendors/sub-category',
        createVendorSubCategoryDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getVendorSubCategories(
    category: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<any> {
    try {
      const params = { page, limit };
      return await this.apiService.get(
        `/vendors/category/${category}/vendors`,
        params,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private generateRandomPassword(length: number = 12): string {
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-`~[]{}|;\':",./<>?';
    let password = '';

    const requirements = [
      /[a-z]/,
      /[A-Z]/,
      /[0-9]/,
      /[!@#$%^&*()_+\-=`~[\]{}\\|;':",./<>?]/,
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

    password = password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
    return password;
  }
  
}
