import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // removes extra fields
      forbidNonWhitelisted: true, // throws error on unknown fields
      transform: true,            // auto-transform types
    }),
  );

  await app.listen(3000);
}
bootstrap();
