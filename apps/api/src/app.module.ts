import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './common/modules/config/config.module';
import { DrizzleModule } from './common/modules/drizzle/drizzle.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [ConfigModule, DrizzleModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
