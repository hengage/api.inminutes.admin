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
  Patch,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('list')
  async getOrders(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('searchQuery') searchQuery: string = '',
    @Query('fromDate') fromDate: Date,
    @Query('toDate') toDate: Date,
    @Query('type') type: string,
    @Query('status') status: string,
    @Query('sort') sort: string,
  ) {
    return this.orderService.getOrders(
      page,
      limit,
      searchQuery,
      fromDate,
      toDate,
      type,
      status,
      sort,
    );
  }

  @Get(':orderId')
  async getOrderDetails(@Param('orderId') orderId: string) {
    return this.orderService.getOrderDetails(orderId);
  }
  @Patch(':orderId/assign')
  async getOrderToRider(
    @Param('orderId') orderId: string,
    @Body('riderId') riderId: string,
  ) {
    return this.orderService.assignOrderToRider(orderId, riderId);
  }

  @Patch(':orderId/status')
  async updateStatus(
    @Param('orderId') orderId: string,
    @Body('approve') status: string,
  ) {
    return this.orderService.updateStatus(orderId, status);
  }

  @Delete(':orderId')
  async delete(@Param('orderId') orderId: string) {
    return this.orderService.delete(orderId);
  }
}
