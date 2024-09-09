import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import corsOptions from './config/cors';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have any decorators
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      transform: true, // Automatically transform payload to DTO instance
    }),
  );
  await app.listen(3000);
}
bootstrap();
