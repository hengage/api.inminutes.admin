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
}
