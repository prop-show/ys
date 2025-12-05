import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import 'dotenv/config';

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export default registerAs('jwt', () => ({
  secret,
  accessTokenOptions: {
    expiresIn: '3600s',
  } as JwtSignOptions,
  refreshTokenOptions: {
    expiresIn: '7d',
  } as JwtSignOptions,
}));
