import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { MetricsService } from './metrics.service';

@Controller('metrics')
@UseGuards(AuthGuard)
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('vendors/summary')
  async getVendorsSummary() {
    return this.metricsService.getVendorsSummary();
  }

  @Get('vendors/top')
  async getTopVendors() {
    return this.metricsService.getTopVendors();
  }

  @Get('/vendors/categories/top')
  async getTopVendorsCategories() {
    return this.metricsService.getTopVendorsCategories();
  }

  @Get('/vendors/chart')
  async getVendorsChart(@Query() query: DateFilterQuery) {
    return this.metricsService.getVendorsChart(query);
  }

  @Get('/riders/summary')
  async getRidersSummary() {
    return this.metricsService.getRidersSummary();
  }

  @Get('/riders/top')
  async getTopRiders() {
    return this.metricsService.getTopRiders();
  }

  @Get('/riders/chart')
  async getRidersChart(@Query() query: DateFilterQuery) {
    return this.metricsService.getRidersChart(query);
  }

  @Get('/products/summary')
  async getProductsSummary() {
    return this.metricsService.getProductsSummary();
  }

  @Get('/products/top')
  async getTopProducts() {
    return this.metricsService.getTopProducts();
  }

  @Get('/products/categories/top')
  async getTopProductsCategories() {
    return this.metricsService.getTopProductsCatgeories();
  }

  @Get('/products/chart')
  async getProductsChart(@Query() query: DateFilterQuery) {
    return this.metricsService.getProductsChart(query);
  }

  @Get('customers/summary')
  async getCustomersSummary() {
    return this.metricsService.getCustomersSummary();
  }

  @Get('customers/top')
  async getTopCustomers() {
    return this.metricsService.getTopCustomers();
  }

  @Get('/customers/chart')
  async getCustomersChart(@Query() query: DateFilterQuery) {
    return this.metricsService.getCustomersChart(query);
  }
}
