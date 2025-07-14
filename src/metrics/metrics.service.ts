import { Injectable } from '@nestjs/common';
import { throwHttpException } from 'src/lib/';
import { ApiService } from 'src/lib/apiCalls';

@Injectable()
export class MetricsService {
  private readonly MODULE_URL = 'admin/metrics';

  constructor(private readonly apiService: ApiService) {}

  async getVendorsSummary() {
    try {
      return await this.apiService.get(`${this.MODULE_URL}/vendors/summary`);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getTopVendors() {
    try {
      return await this.apiService.get(`${this.MODULE_URL}/vendors/top`);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getTopVendorsCategories() {
    try {
      return await this.apiService.get(
        `${this.MODULE_URL}/vendors/categories/top`,
      );
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getRidersSummary() {
    try {
      return await this.apiService.get(`${this.MODULE_URL}/riders/summary`);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getTopRiders() {
    try {
      return await this.apiService.get(`${this.MODULE_URL}/riders/top`);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getProductsSummary() {
    try {
      return await this.apiService.get(`${this.MODULE_URL}/products/summary`);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getTopProducts() {
    try {
      return await this.apiService.get(`${this.MODULE_URL}/products/top`);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getTopProductsCatgeories() {
    try {
      return await this.apiService.get(
        `${this.MODULE_URL}/products/categories/top`,
      );
    } catch (error) {
      throwHttpException;
    }
  }

  async getCustomersSummary() {
    try {
      return await this.apiService.get(`${this.MODULE_URL}/customers/summary`);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getTopCustomers() {
    try {
      return await this.apiService.get(`${this.MODULE_URL}/customers/top`);
    } catch (error) {
      throwHttpException(error);
    }
  }
}
