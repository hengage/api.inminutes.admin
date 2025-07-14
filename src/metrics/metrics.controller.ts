import { Controller, UseGuards, Get } from '@nestjs/common';
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

  @Get('/riders/summary')
  async getRidersSummary() {
    return this.metricsService.getRidersSummary();
  }

  @Get('/riders/top')
  async getTopRiders() {
    return this.metricsService.getTopRiders();
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

  @Get('customers/summary')
  async getCustomersSummary() {
    return this.metricsService.getCustomersSummary();
  }

  @Get('customers/top')
  async getTopCustomers() {
    return this.metricsService.getTopCustomers();
  }
}
