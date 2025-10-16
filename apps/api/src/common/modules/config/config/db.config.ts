import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  DB_URL: process.env.DB_URL,
}));
