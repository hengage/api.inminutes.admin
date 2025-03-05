import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from './customer.dto';
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

  async getCustomers(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    fromDateJoined: string = '',
    toDateJoined: string = '',
    status: string = '',
  ): Promise<any> {
    try {
      const params = {
        page,
        limit,
        search,
        fromDateJoined,
        toDateJoined,
        status,
      };
      return await this.apiService.get('/admin/customers', params);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCustomerOrders(
    customerId: string = '',
    page: number = 1,
    limit: number = 10,
    search: string = '',
    startDate: string = '',
    endDate: string = '',
    maxPrice: number,
    minPrice: number,
    status: string = '',
  ): Promise<any> {
    try {
      const params = {
        page,
        limit,
        search,
        endDate,
        startDate,
        maxPrice,
        minPrice,
        status,
      };
      return await this.apiService.get(
        `/admin/customer/${customerId}/orders`,
        params,
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
}
