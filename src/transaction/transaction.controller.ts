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

@Controller('transaction')
@UseGuards(AuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('list')
  async getTransactions(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Query('fromDate') fromDate: Date,
    @Query('toDate') toDate: Date,
    @Query('reason') reason: string,
    @Query('status') status: string,
    @Query('type') type: string,
    @Query('lowestAmount') lowestAmount: string,
    @Query('highestAmount') highestAmount: string,
  ) {
    return this.transactionService.getTransactions(
      page,
      limit,
      search,
      reason,
      fromDate,
      toDate,
      status,
      type,
      lowestAmount,
      highestAmount
    );
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
