import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NotFoundExceptionFilter } from './libs/exception/not-found-exception';
import { ErrorInterceptor } from './libs/interceptor/error.interceptor';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalInterceptors(new ErrorInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Api Gateway')
    .setDescription(
      'e-commerce api build with microservice architecture using nestjs',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3003).then(() => {
    Logger.log('🚀 Gateway Server Successfully started at 3003');
  });
}
bootstrap();
