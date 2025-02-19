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
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
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
    OrderModule,
  ],
  controllers: [
    AppController,
    VendorController,
    CustomerController,
    RiderController,
    OrderController,
  ],
  providers: [
    AppService,
    AuthService,
    AdminService,
    BrevoService,
    VendorService,
    CustomerService,
    RiderService,
    OrderService,
  ],
})
export class AppModule {}
