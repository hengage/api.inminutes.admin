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
import {
  AssignRiderDto,
  GetOrdersQueryDto,
  UpdateOrderStatusDto,
} from './order.dto';
import { OrderService } from './order.service';

@Controller('orders')
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

  @Patch(':orderId/assign-rider')
  async assignToRider(
    @Param('orderId') orderId: string,
    @Body() assignRiderDto: AssignRiderDto,
  ) {
    return this.orderService.assignOrderToRider(
      orderId,
      assignRiderDto.riderId,
    );
  }

  @Patch(':orderId/status')
  async updateStatus(
    @Param('orderId') orderId: string,
    @Body() updateStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateStatus(orderId, updateStatusDto.status);
  }

  @Delete(':orderId')
  async delete(@Param('orderId') orderId: string) {
    return this.orderService.delete(orderId);
  }
}
