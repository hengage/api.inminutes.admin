import { Injectable } from '@nestjs/common';
import { throwHttpException } from 'src/lib';
import { ApiService } from 'src/lib/apiCalls';
import { GetErrandsQueryDto } from './errand.dto';
@Injectable()
export class ErrandService {
  constructor(private readonly apiService: ApiService) {}

  async getErrands(query: GetErrandsQueryDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/errands', query);
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
