import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { HashService } from 'src/common/services/hash.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable({ scope: Scope.REQUEST })
export class SignupPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    private readonly hashService: HashService,
  ) {}

  async transform(createUserDto: CreateUserDto, metadata: ArgumentMetadata) {
    const hashedPassword: string = await this.hashService.hashData(
      createUserDto.password,
    );

    createUserDto = {
      ...createUserDto,
      password: hashedPassword,
      refreshToken: null,
    };

    return createUserDto;
  }
}
