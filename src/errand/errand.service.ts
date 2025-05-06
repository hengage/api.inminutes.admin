import { BadRequestException, Injectable } from '@nestjs/common';
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
      throw new BadRequestException(error.message);
    }
  }

  async getErrandDetails(errandId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/errands/${errandId}`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async changeErrandStatus(errandId: string, status: string): Promise<any> {
    try {
      return await this.apiService.put(`/admin/errands/${errandId}/status`, {
        status,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(errandId: string): Promise<any> {
    try {
      return await this.apiService.delete(`/admin/errands/${errandId}/delete`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
