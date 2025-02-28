import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiService } from 'src/lib/apiCalls';
@Injectable()
export class OrderService {
  constructor(private readonly apiService: ApiService) {}

  async getOrders(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    fromDate: Date,
    toDate: Date,
    type: string = '',
    status: string = '',
    sort: string = '',
  ): Promise<any> {
    try {
      const params = {
        page,
        limit,
        search,
        type,
        fromDate,
        toDate,
        status,
        sort,
      };
      return await this.apiService.get('/admin/orders', params);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOrderDetails(orderId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/orders/${orderId}`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async assignOrderToRider(orderId: string, riderId: string): Promise<any> {
    try {
      return await this.apiService.patch(
        `/admin/orders/${orderId}/assign-rider`,
        { riderId },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateStatus(orderId: string, status: string): Promise<any> {
    try {
      return await this.apiService.put(`/admin/orders/${orderId}/status`, {
        status,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(orderId: string): Promise<any> {
    try {
      return await this.apiService.delete(`/admin/orders/${orderId}/delete`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
