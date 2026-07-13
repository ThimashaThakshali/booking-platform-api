import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validate every incoming request automatically
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove unknown fields
      forbidNonWhitelisted: true, // Reject extra fields
      transform: true, // Convert types automatically
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
