import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    // 1. Setup the Database Connection
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',      // XAMPP default
      password: '',          // XAMPP default is empty
      database: 'assessment_db',
      entities: [User],      // Tell TypeORM about your User table
      synchronize: true,     // Auto-creates the table in XAMPP!
    }),
    // 2. Import your Users logic
    UsersModule,
  ],
})
export class AppModule {}