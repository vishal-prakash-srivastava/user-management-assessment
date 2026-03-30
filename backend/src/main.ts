import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('User Management API')
    .setDescription('Fullstack Screening Task API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const userService = app.get(UsersService);
  const adminEmail = 'admin@test.com';

  try {
    const adminExists = await userService.findOneByEmail(adminEmail);

    if (!adminExists) {
      await userService.create({
        first_name: 'Admin',
        last_name: 'User',
        email: adminEmail,
        password: 'password123',
      });
      console.log('Admin user created');
    }
  } catch {
    console.log('Admin check/creation skipped (already exists or DB busy).');
  }
  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
