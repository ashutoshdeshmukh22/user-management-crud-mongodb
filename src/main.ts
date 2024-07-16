import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { APP_PORT } from './environment';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('User Management - CRUD API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      urls: [
        {
          url: '/api-json',
          name: 'API JSON',
        },
      ],
    },
  };

  SwaggerModule.setup('api', app, document, swaggerCustomOptions);

  await app.listen(APP_PORT).then(() => {
    logger.log(`🚀 Application is running on port ${APP_PORT}`);
  });
}

bootstrap().catch((err) => {
  Logger.error(err);
  throw err;
});
