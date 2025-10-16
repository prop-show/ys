import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: 'YS',
}));
