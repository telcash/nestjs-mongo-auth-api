import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.usersRepository.findById(id);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<User | null> {
    return await this.usersRepository.delete(id);
  }
}
