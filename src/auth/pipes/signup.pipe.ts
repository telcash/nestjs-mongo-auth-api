import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { HashService } from 'src/common/services/hash.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/users/types/user-role';

@Injectable({ scope: Scope.REQUEST })
export class SignupPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    private readonly hashService: HashService,
  ) {}

  async transform(createUserDto: CreateUserDto) {
    const hashedPassword: string = await this.hashService.hashData(
      createUserDto.password,
    );

    createUserDto = {
      ...createUserDto,
      password: hashedPassword,
      role: UserRole.USER,
      refreshToken: null,
    };

    return createUserDto;
  }
}
