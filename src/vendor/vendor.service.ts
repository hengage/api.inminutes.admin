import { Injectable } from '@nestjs/common';
import { throwHttpException } from 'src/lib';
import { ApiService } from 'src/lib/apiCalls';
import {
  CreateVendorCategoryDto,
  CreateVendorDto,
  CreateVendorSubCategoryDto,
  GetVendorMetricsDto,
  GetVendorsDto,
  GetVendorSubCategoriesDto,
  UpdateVendorDto,
} from './vendor.dto';
import { generateRandomPassword } from 'src/auth';

@Injectable()
export class VendorService {
  constructor(private readonly apiService: ApiService) {}

  async createVendor(createVendorDto: CreateVendorDto): Promise<any> {
    try {
      const newCreateVendor = {
        ...createVendorDto,
        password: generateRandomPassword(),
      };
      return await this.apiService.post(
        '/admin/vendors/register',
        newCreateVendor,
      );
    } catch (error) {
      throwHttpException(error);
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
      throwHttpException(error);
    }
  }

  async getVendors(query: GetVendorsDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/vendors', query);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getVendorDetails(vendorId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/vendors/${vendorId}`);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async approveOrDisapprove(vendorId: string, approve: boolean): Promise<any> {
    try {
      return await this.apiService.put(`/admin/vendors/${vendorId}/approval`, {
        approve,
      });
    } catch (error) {
      throwHttpException(error);
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
      throwHttpException(error);
    }
  }
  async getVendorCategories(query: GetVendorSubCategoriesDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/vendors/category', query);
    } catch (error) {
      throwHttpException(error);
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
      throwHttpException(error);
    }
  }

  async getVendorSubCategories(
    category: string,
    query: GetVendorSubCategoriesDto,
  ): Promise<any> {
    try {
      return await this.apiService.get(
        `/admin/vendors/sub-category/${category}`,
        query,
      );
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getTopVendors(query: GetVendorsDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/vendors/top', query);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getTopVendorCategories(query: GetVendorSubCategoriesDto): Promise<any> {
    try {
      return await this.apiService.get('/vendors/category/top', query);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getVendorSummary(): Promise<any> {
    try {
      return await this.apiService.get(`/admin/vendors/summary`);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getVendorMetrics(query: GetVendorMetricsDto): Promise<any> {
    try {
      return await this.apiService.get(`/admin/vendors/metrics`, query);
    } catch (error) {
      throwHttpException(error);
    }
  }
}
