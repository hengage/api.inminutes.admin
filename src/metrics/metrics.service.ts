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
}
