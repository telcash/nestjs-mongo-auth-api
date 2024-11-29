import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDecorator } from 'src/users/decorators/user.decorator';
import { JwtTokens } from './types/jwt-tokens.type';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { User } from 'src/users/schemas/user.schema';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { SignupPipe } from './pipes/signup.pipe';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body(SignupPipe) createUserDto: CreateUserDto): Promise<User> {
    return plainToInstance(User, await this.authService.signup(createUserDto), {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@UserDecorator() user: User): Promise<JwtTokens> {
    return await this.authService.login(user);
  }

  @UseGuards(JwtAccessGuard)
  @Post('logout')
  async logout(@UserDecorator('sub') id: string): Promise<User> {
    return plainToInstance(User, await this.authService.logout(id), {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refreshTokens(
    @UserDecorator('sub') id: string,
    @UserDecorator('refreshToken') refreshToken: string,
  ): Promise<JwtTokens> {
    return await this.authService.refreshTokens(id, refreshToken);
  }
}
