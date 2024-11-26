import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/decorators/user.decorator';
import { JwtTokens } from './types/jwt-tokens.type';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user): Promise<JwtTokens> {
    return await this.authService.login(user);
  }
}
