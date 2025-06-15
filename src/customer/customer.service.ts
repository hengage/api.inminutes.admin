import { Injectable } from '@nestjs/common';
import { throwHttpException } from 'src/lib';
import { ApiService } from 'src/lib/apiCalls';
import {
  GetCustomerOrdersQueryDto,
  GetCustomersQueryDto,
  UpdateCustomerDto,
} from './customer.dto';

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
      throwHttpException(error);
    }
  }

  async getCustomers(query: GetCustomersQueryDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/customers', query);
    } catch (error) {
      throwHttpException(error);
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
      throwHttpException(error);
    }
  }

  async getCustomerDetails(customerId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/customers/${customerId}`);
    } catch (error) {
      throwHttpException(error);
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
      throwHttpException(error);
    }
  }

  async delete(customerId: string): Promise<any> {
    try {
      return await this.apiService.delete(
        `/admin/customers/${customerId}/delete`,
      );
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getTopCustomers(query: GetCustomersQueryDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/customers/top', query);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getCustomerSummary(): Promise<any> {
    try {
      return await this.apiService.get(`/admin/customers/summary`);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getCustomerMetrics(): Promise<any> {
    try {
      return await this.apiService.get(`/admin/customers/metrics`);
    } catch (error) {
      throwHttpException(error);
    }
  }
}
