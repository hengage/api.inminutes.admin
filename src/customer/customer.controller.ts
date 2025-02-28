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
  UpdateCustomerDto,
} from './customer.dto';
import { AuthGuard } from 'src/auth/auth.guard';

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
  async getCustomers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Query('fromDateJoined') fromDateJoined: string = '',
    @Query('toDateJoined') toDateJoined: string = '',
    @Query('status') status: string = '',
  ) {
    return this.customerService.getCustomers(
      page,
      limit,
      search,
      fromDateJoined,
      toDateJoined,
      status,
    );
  }
  @Get('/order/:customerId/list')
  async getCustomerOders(
    @Param('customerId') customerId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Query('startDate') startDate: string = '',
    @Query('endDate') endDate: string = '',
    @Query('maxPrice') maxPrice: number,
    @Query('minPrice') minPrice: number,
    @Query('status') status: string = '',
  ) {
    return this.customerService.getCustomerOrders(
      customerId,
      page,
      limit,
      search,
      startDate,
      endDate,
      maxPrice,
      minPrice,
      status
    );
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
  async delete(
    @Param('customerId') customerId: string
  ) {
    return this.customerService.delete(customerId);
  }


}
