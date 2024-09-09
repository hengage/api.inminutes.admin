import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './admin';
import { Admin } from './admin';

@Module({
  controllers: [AdminController],
  providers: [AdminService, Admin],
})
export class AdminModule {}
