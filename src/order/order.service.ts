import { Injectable } from '@nestjs/common';
import { throwHttpException } from 'src/lib';
import { ApiService } from 'src/lib/apiCalls';
import { GetOrdersQueryDto } from './order.dto';
@Injectable()
export class OrderService {
  constructor(private readonly apiService: ApiService) {}

  async getOrders(query: GetOrdersQueryDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/orders', query);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getOrderDetails(orderId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/orders/${orderId}`);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async assignOrderToRider(orderId: string, riderId: string): Promise<any> {
    try {
      return await this.apiService.patch(
        `/admin/orders/${orderId}/assign-rider`,
        { riderId },
      );
    } catch (error) {
      throwHttpException(error);
    }
  }

  async updateStatus(orderId: string, status: string): Promise<any> {
    try {
      return await this.apiService.put(`/admin/orders/${orderId}/status`, {
        status,
      });
    } catch (error) {
      throwHttpException(error);
    }
  }

  async delete(orderId: string): Promise<any> {
    try {
      return await this.apiService.delete(`/admin/orders/${orderId}/delete`);
    } catch (error) {
      throwHttpException(error);
    }
  }
}
