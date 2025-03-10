import { BadRequestException, Injectable } from '@nestjs/common';
import {
  GetCustomerOrdersQueryDto,
  GetCustomersPaginationDto,
  GetCustomersQueryDto,
  UpdateCustomerDto,
} from './customer.dto';
import { ApiService } from 'src/lib/apiCalls';
@Injectable()
export class CustomerService {
  constructor(private readonly apiService: ApiService) {}

  async updateCustomer(
    updateCustomerDto: UpdateCustomerDto,
    customerId: string,
  ): Promise<any> {
    try {
      return await this.apiService.put(
        `/customer/update/${customerId}`,
        updateCustomerDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCustomers(query: GetCustomersQueryDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/customers', query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCustomerOrders(
    customerId: string = '',
    query: GetCustomerOrdersQueryDto,
  ): Promise<any> {
    try {
      return await this.apiService.get(
        `/admin/customer/${customerId}/orders`,
        query,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCustomerDetails(customerId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/customers/${customerId}`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async approveOrDisapprove(
    customerId: string,
    approve: boolean,
  ): Promise<any> {
    try {
      return await this.apiService.put(
        `/admin/customers/${customerId}/approval`,
        {
          approve,
        },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(customerId: string): Promise<any> {
    try {
      return await this.apiService.delete(
        `/admin/customers/${customerId}/delete`,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTopCustomers(query: GetCustomersQueryDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/customers/top', query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCustomerSummary(): Promise<any> {
    try {
      return await this.apiService.get(`/admin/customers/summary`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCustomerMetrics(): Promise<any> {
    try {
      return await this.apiService.get(`/admin/customers/metrics`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
