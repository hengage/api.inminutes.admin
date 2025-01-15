import { Module } from '@nestjs/common';
import { BrevoService } from './email/brevo.service';

@Module({
  providers: [BrevoService],
  exports: [BrevoService],
})
export class NotificationsModule {}
