import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getStats(@Query() query: Record<string, any>) {
    return this.dashboardService.getStats(query);
  }

  @Get('/graph')
  async getGraphData(@Query() query: Record<string, any>) {
    return this.dashboardService.getGraphData(query);
  }
}
