import { Injectable } from '@nestjs/common';
import { throwHttpException } from 'src/lib';
import { ApiService } from 'src/lib/apiCalls';

@Injectable()
export class DashboardService {
  constructor(private readonly apiService: ApiService) {}

  async getStats(query: Record<string, any>): Promise<any> {
    try {
      return await this.apiService.get('/admin/dashboard', query);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getGraphData(query: Record<string, any>): Promise<any> {
    try {
      return await this.apiService.get('/admin/dashboard/graph', query);
    } catch (error) {
      throwHttpException(error);
    }
  }
}
