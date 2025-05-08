import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ApiService } from 'src/lib/apiCalls';

@Module({
  providers: [ApiService],
  exports: [ApiService]
})
export class DashboardModule {}
