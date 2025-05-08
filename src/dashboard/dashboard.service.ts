import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiService } from 'src/lib/apiCalls';

@Injectable()
export class DashboardService {
  constructor(private readonly apiService: ApiService) {}

  async getStats(query: Record<string, any>): Promise<any> {
    try {
      return await this.apiService.get('/admin/dashboard', query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getGraphData(query: Record<string, any>): Promise<any> {
    try {
      return await this.apiService.get('/admin/dashboard/graph', query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
