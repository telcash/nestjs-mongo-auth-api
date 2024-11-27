import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { UserRole } from './types/user-role';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { plainToInstance } from 'class-transformer';
import { UserDecorator } from './decorators/user.decorator';

@UseGuards(JwtAccessGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return plainToInstance(
      User,
      await this.usersService.create(createUserDto),
      { excludeExtraneousValues: true },
    );
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll(): Promise<User[]> {
    return plainToInstance(User, await this.usersService.findAll(), {
      excludeExtraneousValues: true,
    });
  }

  @Get('profile')
  async findProfile(@UserDecorator('sub') id: string): Promise<User | null> {
    return plainToInstance(User, await this.usersService.findOne(id), {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return plainToInstance(User, await this.usersService.findOne(id), {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return plainToInstance(
      User,
      await this.usersService.update(id, updateUserDto),
      { excludeExtraneousValues: true },
    );
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User | null> {
    return plainToInstance(User, await this.usersService.remove(id), {
      excludeExtraneousValues: true,
    });
  }
}
