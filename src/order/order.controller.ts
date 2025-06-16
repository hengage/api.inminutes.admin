import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetOrdersQueryDto } from './order.dto';
import { OrderService } from './order.service';

@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('')
  async getOrders(@Query() query: GetOrdersQueryDto) {
    return this.orderService.getOrders(query);
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
