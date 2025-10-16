import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './common/modules/config/config.module';
import { DrizzleModule } from './common/modules/drizzle/drizzle.module';

@Module({
  imports: [ConfigModule, DrizzleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
