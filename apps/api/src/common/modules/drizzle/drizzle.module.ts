import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { DrizzleProvider } from './drizzle.provider';
import { DrizzleService } from './drizzle.service';

@Module({
  imports: [ConfigModule],
  providers: [DrizzleService, DrizzleProvider],
  exports: [DrizzleService],
})
export class DrizzleModule {}
