import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  MongooseModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      uri:
        configService.get<string>('DB_URL') ||
        'mongodb://localhost/inminutes_admin',
    }),
    inject: [ConfigService],
  }),
];
