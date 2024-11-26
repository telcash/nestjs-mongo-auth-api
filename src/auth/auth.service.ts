import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HashService } from 'src/common/services/hash.service';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { JwtTokens } from './types/jwt-tokens.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await this.hashService.compareData(password, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User): Promise<JwtTokens> {
    const tokens: JwtTokens = await this.getTokens(user);
    return tokens;
  }

  async getTokens(user: User): Promise<JwtTokens> {
    const payload = {
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
        ),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH TOKEN_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH  TOKEN_EXPIRATION_TIME',
        ),
      }),
    ]);
    return { accessToken, refreshToken };
  }
}
