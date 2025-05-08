import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AdminService } from './admin/admin.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BrevoService } from './notifications/email/brevo.service';
import { VendorService } from './vendor/vendor.service';
import { VendorController } from './vendor/vendor.controller';
import { VendorModule } from './vendor/vendor.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { CustomerService } from './customer/customer.service';
import { CustomerController } from './customer/customer.controller';
import { CustomerModule } from './customer/customer.module';
import { TransactionService } from './transaction/transaction.service';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionController } from './transaction/transaction.controller';
import { RiderService } from './rider/rider.service';
import { RiderController } from './rider/rider.controller';
import { RiderModule } from './rider/rider.module';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { ProductController } from './product/product.controller';
import { MediaModule } from './media/media.module';
import { ErrandModule } from './errand/errand.module';
import { ErrandController } from './errand/errand.controller';
import { ErrandService } from './errand/errand.service';
import { AuthController } from './auth/auth.controller';
import { AdminController } from './admin/admin.controller';
import { MediaController } from './media/media.controller';
import { MediaService } from './media/media.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
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
    OrderModule,
    CustomerModule,
    TransactionModule,
    MediaModule,
    ProductModule,
    RiderModule,
    ErrandModule,
    DashboardModule,
  ],

  controllers: [
    AppController,
    VendorController,
    CustomerController,
    OrderController,
    RiderController,
    ProductController,
    TransactionController,
    ErrandController,
    AuthController,
    AdminController,
    MediaController,
    DashboardController
  ],
  providers: [
    AppService,
    AuthService,
    AdminService,
    BrevoService,
    VendorService,
    OrderService,
    CustomerService,
    TransactionService,
    RiderService,
    ProductService,
    ErrandService,
    MediaService,
    JwtService,
    DashboardService
  ],
})
export class AppModule {}
