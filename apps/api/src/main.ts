import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors';
import { setupSwagger } from './common/utils/setup-swagger';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.useGlobalInterceptors(new TransformInterceptor());

  const port = Number(process.env.PORT || 3000);
  setupSwagger(app, port);

  await app.listen(port);
  logger.log(`项目在: http://localhost:${port}`);
}

bootstrap().catch((err) => console.error(err));
