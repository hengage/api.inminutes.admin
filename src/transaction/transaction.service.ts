import { Injectable } from '@nestjs/common';
import { throwHttpException } from 'src/lib';
import { ApiService } from 'src/lib/apiCalls';
import { GetTransactionsQueryDto } from './transaction.dto';
@Injectable()
export class TransactionService {
  constructor(private readonly apiService: ApiService) {}

  async getTransactions(query: GetTransactionsQueryDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/transactions', query);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getTransactionDetails(transactionId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/transactions/${transactionId}`);
    } catch (error) {
      throwHttpException(error);
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
      throwHttpException(error);
    }
  }

  async delete(transactionId: string): Promise<any> {
    try {
      return await this.apiService.delete(
        `/admin/transactions/${transactionId}/delete`,
      );
    } catch (error) {
      throwHttpException(error);
    }
  }
}
