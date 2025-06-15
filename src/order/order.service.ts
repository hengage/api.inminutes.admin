import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiService } from 'src/lib/apiCalls';
import { GetOrdersQueryDto } from './order.dto';
import { extractErrorMessage } from 'src/lib';
@Injectable()
export class OrderService {
  constructor(private readonly apiService: ApiService) {}

  async getOrders(query: GetOrdersQueryDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/orders', query);
    } catch (error) {
      throw new BadRequestException(extractErrorMessage(error));
    }
  }

  async getOrderDetails(orderId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/orders/${orderId}`);
    } catch (error) {
      throw new BadRequestException(extractErrorMessage(error));
    }
  }
  
  async assignOrderToRider(orderId: string, riderId: string): Promise<any> {
    try {
      return await this.apiService.patch(
        `/admin/orders/${orderId}/assign-rider`,
        { riderId },
      );
    } catch (error) {
      throw new BadRequestException(extractErrorMessage(error));
    }
  }

  async updateStatus(orderId: string, status: string): Promise<any> {
    try {
      return await this.apiService.put(`/admin/orders/${orderId}/status`, {
        status,
      });
    } catch (error) {
      throw new BadRequestException(extractErrorMessage(error));
    }
  }

  async delete(orderId: string): Promise<any> {
    try {
      return await this.apiService.delete(`/admin/orders/${orderId}/delete`);
    } catch (error) {
      throw new BadRequestException(extractErrorMessage(error));
    }
  }
}
