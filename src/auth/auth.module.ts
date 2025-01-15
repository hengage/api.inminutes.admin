import { Module } from '@nestjs/common';
import { AdminModule } from 'src/admin/admin.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtConstant } from 'src/lib/constants';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    AdminModule,
    NotificationsModule,
    // JwtModule.register({
    //   global: true,
    //   secret: JwtConstant.secret,
    //   signOptions: { expiresIn: JwtConstant.expiresIn },
    // }),

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(JwtConstant.secret),
        signOptions: { expiresIn: JwtConstant.expiresIn },
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
