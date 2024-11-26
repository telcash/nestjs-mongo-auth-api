import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserDecorator } from 'src/users/decorators/user.decorator';
import { JwtTokens } from './types/jwt-tokens.type';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { User } from 'src/users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@UserDecorator() user: User): Promise<JwtTokens> {
    return await this.authService.login(user);
  }

  @UseGuards(JwtAccessGuard)
  @Post('logout')
  async logout(@UserDecorator('sub') id: string): Promise<User> {
    return await this.authService.logout(id);
  }
}
