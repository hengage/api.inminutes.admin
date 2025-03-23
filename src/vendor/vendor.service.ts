import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateVendorCategoryDto,
  CreateVendorDto,
  CreateVendorSubCategoryDto,
  GetVendorsDto,
  GetVendorSubCategoriesDto,
  UpdateVendorDto,
} from './vendor.dto';
import { ApiService } from 'src/lib/apiCalls';
@Injectable()
export class VendorService {
  constructor(private readonly apiService: ApiService) {}

  async createVendor(createVendorDto: CreateVendorDto): Promise<any> {
    try {
      const newCreateVendor = {
        ...createVendorDto,
        password: this.generateRandomPassword(),
      };
      return await this.apiService.post(
        '/admin/vendors/register',
        newCreateVendor,
      );
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
        `/admin/vendors/update/${vendorId}`,
        updateVendorDto,
      );
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async getVendors(query: GetVendorsDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/vendors', query);
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
      return await this.apiService.get('/admin/vendors/category');
    } catch (error) {
      console.log(error);
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
    query: GetVendorSubCategoriesDto,
  ): Promise<any> {
    try {
      return await this.apiService.get(
        `/vendors/category/${category}/vendors`,
        query,
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

  async getTopVendors(query: GetVendorsDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/vendors/top', query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTopVendorCategories(query: GetVendorSubCategoriesDto): Promise<any> {
    try {
      return await this.apiService.get('/vendors/category/top', query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getVendorSummary(): Promise<any> {
    try {
      return await this.apiService.get(`/admin/vendors/summary`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getVendorMetrics(): Promise<any> {
    try {
      return await this.apiService.get(`/admin/vendors/metrics`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
