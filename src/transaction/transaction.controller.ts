import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  BadRequestException,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetTransactionsQueryDto } from './transaction.dto';

@Controller('transaction')
@UseGuards(AuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('list')
  async getTransactions(@Query() query: GetTransactionsQueryDto) {
    return this.transactionService.getTransactions(query);
  }

  @Get(':transactionId')
  async getTransactionDetails(@Param('transactionId') transactionId: string) {
    return this.transactionService.getTransactionDetails(transactionId);
  }

  @Put(':transactionId/status')
  async updateTransactionStatus(
    @Param('transactionId') transactionId: string,
    @Body('status') status: string,
  ) {
    return this.transactionService.changeTransactionStatus(
      transactionId,
      status,
    );
  }

  @Delete(':transactionId')
  async delete(@Param('transactionId') transactionId: string) {
    return this.transactionService.delete(transactionId);
  }
}
