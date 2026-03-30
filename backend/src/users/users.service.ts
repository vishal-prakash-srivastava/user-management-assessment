import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const newUser = this.repo.create({
      ...dto,
      password: hashedPassword,
    });
    return await this.repo.save(newUser);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOneByEmail(email: string) {
    return await this.repo.findOne({ where: { email } });
  }

  async update(id: number, dto: UpdateUserDto): Promise<User | null> {
    if (dto.password && dto.password.trim().length > 0) {
      const salt = await bcrypt.genSalt(10);
      dto.password = await bcrypt.hash(dto.password, salt);
    } else {
      delete dto.password;
    }

    delete (dto as { id?: number }).id;

    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id } });
  }

  async softRemove(id: number) {
    return await this.repo.softDelete(id);
  }

  async hardRemove(id: number) {
    return await this.repo.delete(id);
  }
}
