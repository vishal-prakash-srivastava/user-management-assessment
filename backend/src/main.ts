import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ADD THIS LINE TO ALLOW FRONTEND ACCESS
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
