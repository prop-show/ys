import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
const logger = new Logger('Swagger');

export function setupSwagger(app: NestExpressApplication, port: number) {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('YS 乙巳')
    .setDescription('一个项目了解nodejs开发产品')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  app.use(
    '/reference',
    apiReference({
      url: '/swagger/json',
      theme: 'default',
      layout: 'modern',
    }),
  );

  logger.log(`Swagger 文档地址: http://localhost:${port}/reference`);
}
