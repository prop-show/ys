import type { UserSelect } from '@ys/shared';

import { Controller, Post, Body } from '@nestjs/common';

import { Auth } from '@/common/decorator/auth.decorator';
import { CurrentUser } from '@/common/decorator/current-user.decorator';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Auth()
  @Post('test')
  test(@CurrentUser() user: UserSelect) {
    console.log('test');
    return user;
  }
}
