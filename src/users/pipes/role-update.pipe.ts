import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class RoleUpdatePipe implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly req) {}

  transform(updateUserDto: UpdateUserDto) {
    if (this.req.user && this.req.user.role === 'user') {
      updateUserDto.role = 'user';
    }
    return updateUserDto;
  }
}
