import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.user(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.user.find().exec();
  }

  async findById(id: string): Promise<User | null> {
    return await this.user.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.user
      .findOne({
        email: email,
      })
      .exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return await this.user
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<User | null> {
    return await this.user.findByIdAndDelete(id).exec();
  }
}
