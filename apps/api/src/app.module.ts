import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './common/modules/config/config.module';
import { DrizzleModule } from './common/modules/drizzle/drizzle.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        return {
          stores: [
            createKeyv({
              url: 'redis://192.168.1.46:6379',
              password: 'redis_kX7KkN',
            }),
          ],
        };
      },
    }),
    ConfigModule,
    DrizzleModule,
    TaskModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
