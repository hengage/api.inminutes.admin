import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AdminService } from './admin/admin.service';
import { JwtModule } from '@nestjs/jwt';
import { BrevoService } from './notifications/email/brevo.service';
import { VendorService } from './vendor/vendor.service';
import { VendorController } from './vendor/vendor.controller';
import { VendorModule } from './vendor/vendor.module';
import { CustomerService } from './customer/customer.service';
import { CustomerController } from './customer/customer.controller';
import { CustomerModule } from './customer/customer.module';
import { RiderController } from './rider/rider.controller';
import { RiderService } from './rider/rider.service';
import { RiderModule } from './rider/rider.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AdminModule,
    AuthModule,
    JwtModule,
    VendorModule,
    CustomerModule,
    RiderModule,
  ],
  controllers: [
    AppController,
    VendorController,
    CustomerController,
    RiderController,
  ],
  providers: [
    AppService,
    AuthService,
    AdminService,
    BrevoService,
    VendorService,
    CustomerService,
    RiderService,
  ],
})
export class AppModule {}
