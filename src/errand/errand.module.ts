import { Module } from '@nestjs/common';
import { ApiService } from 'src/lib/apiCalls';

@Module({
  providers: [ApiService],
  exports: [ApiService],
})
export class ErrandModule {}
