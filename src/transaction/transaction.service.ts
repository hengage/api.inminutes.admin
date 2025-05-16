import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiService } from 'src/lib/apiCalls';
@Injectable()
export class TransactionService {
  constructor(private readonly apiService: ApiService) {}

  async getTransactions(
    page: number = 1,
    limit: number = 10,
    search: string,
    reason: string,
    startDate: Date,
    endDate: Date,
    status: string,
    type: string,
    lowestAmount: string,
    highestAmount: string,
  ): Promise<any> {
    try {
      const params = {
        page,
        limit,
        search,
        endDate,
        startDate,
        reason,
        status,
        type,
        lowestAmount,
        highestAmount
      };
      return await this.apiService.get('/admin/transactions', params);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTransactionDetails(transactionId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/transactions/${transactionId}`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async changeTransactionStatus(
    transactionId: string,
    status: string,
  ): Promise<any> {
    try {
      return await this.apiService.put(
        `/admin/transactions/${transactionId}/status`,
        {
          status,
        },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(transactionId: string): Promise<any> {
    try {
      return await this.apiService.delete(
        `/admin/transactions/${transactionId}/delete`,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
