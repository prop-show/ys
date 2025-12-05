import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { schema, UserSelect } from '@ys/shared';
import { eq } from 'drizzle-orm';

import { hashPassword, verifyPassword } from '@/common/lib/password';
import { ConfigService } from '@/common/modules/config/config.service';
import { DrizzleService } from '@/common/modules/drizzle/drizzle.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const selectedUser = await this.drizzle.db
      .select()
      .from(schema.user)
      .where(eq(schema.user.username, username));

    if (!selectedUser.length) {
      throw new BadRequestException('用户名不存在');
    }

    const isVerified = await verifyPassword(selectedUser[0].password, password);

    if (!isVerified) {
      throw new BadRequestException('密码错误');
    }

    return this.generateToken(selectedUser[0]);
  }

  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;

    const selectedUser = await this.drizzle.db
      .select()
      .from(schema.user)
      .where(eq(schema.user.username, username));

    if (selectedUser.length) {
      throw new BadRequestException('用户名已存在');
    }

    const hashedPassword = await hashPassword(password);

    const [result] = await this.drizzle.db
      .insert(schema.user)
      .values({
        username,
        password: hashedPassword,
      })
      .returning();

    return this.generateToken(result);
  }

  private async generateToken(user: UserSelect) {
    const payload = { sub: user.id, username: user.username };
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
          payload,
          this.configService.jwt.accessTokenOptions,
        ),
        this.jwtService.signAsync(
          payload,
          this.configService.jwt.refreshTokenOptions,
        ),
      ]);

      return { accessToken, refreshToken };
    } catch (err) {
      console.error(err);
    }
  }
}
