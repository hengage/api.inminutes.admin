import { Injectable } from '@nestjs/common';
import { throwHttpException } from 'src/lib';
import { ApiService } from 'src/lib/apiCalls';
@Injectable()
export class ErrandService {
  constructor(private readonly apiService: ApiService) {}

  async getErrands(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    startDate: Date,
    endDate: Date,
    type: string = '',
    status: string = '',
  ): Promise<any> {
    try {
      const params = { page, limit, search, startDate, endDate, type, status };
      return await this.apiService.get('/admin/errands', params);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getErrandDetails(errandId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/errands/${errandId}`);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async changeErrandStatus(errandId: string, status: string): Promise<any> {
    try {
      return await this.apiService.put(`/admin/errands/${errandId}/status`, {
        status,
      });
    } catch (error) {
      throwHttpException(error);
    }
  }

  async delete(errandId: string): Promise<any> {
    try {
      return await this.apiService.delete(`/admin/errands/${errandId}/delete`);
    } catch (error) {
      throwHttpException(error);
    }
  }
}
