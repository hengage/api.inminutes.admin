import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  BadRequestException,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import {
  GetCustomerOrdersQueryDto,
  GetCustomersQueryDto,
  UpdateCustomerDto,
} from './customer.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { query } from 'express';

@Controller('customer')
@UseGuards(AuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Put('update/:customerId')
  async updateCustomer(
    @Param('customerId') customerId: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.updateCustomer(updateCustomerDto, customerId);
  }

  @Get('list')
  async getCustomers(@Query() query: GetCustomersQueryDto) {
    return this.customerService.getCustomers(query);
  }
  @Get('/order/:customerId/list')
  async getCustomerOders(
    @Param('customerId') customerId: string,
    @Query() query: GetCustomerOrdersQueryDto,
  ) {
    return this.customerService.getCustomerOrders(customerId, query);
  }

  @Get(':customerId')
  async getCustomerDetails(@Param('customerId') customerId: string) {
    return this.customerService.getCustomerDetails(customerId);
  }

  @Put(':customerId/approval')
  async approveOrDisapprove(
    @Param('customerId') customerId: string,
    @Body('approve') approve: boolean,
  ) {
    return this.customerService.approveOrDisapprove(customerId, approve);
  }

  @Delete(':customerId/delete')
  async delete(@Param('customerId') customerId: string) {
    return this.customerService.delete(customerId);
  }

  @Get('top')
  async getTopCustomers(@Query() query: GetCustomersQueryDto) {
    return this.customerService.getTopCustomers(query);
  }

  @Get('summary')
  async getCustomerSummary() {
    return this.customerService.getCustomerSummary();
  }

  @Get('metrics')
  async getCustomerMetrics() {
    return this.customerService.getCustomerMetrics();
  }
}
