import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';
// import basicAuth from 'basic-auth';
import { NotFoundExceptionFilter } from './exception/not-found-exception';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use('/docs', (req: Request, res: Response, next: NextFunction) => {
  //   const credentials = basicAuth(req);
  //   if (
  //     !credentials ||
  //     credentials.name !== 'asdfghjkl;' ||
  //     credentials.pass !== 'asdfghjkl;'
  //   ) {
  //     res.setHeader('WWW-Authenticate', 'Basic realm="swagger"');
  //     res.status(401).send('Unauthorized');
  //   } else {
  //     next();
  //   }
  // });

  app.setGlobalPrefix('api');
  // app.enableVersioning({
  //   type: VersioningType.URI,
  // });
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
  const development = process.env.NODE_ENV === 'development';
  if (development) {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Ko HAK API Service')
      .setTermsOfService('Terms Of Service')
      .setDescription(
        'HAK API Service is a robust and user-friendly platform that allows developers to integrate taxi booking and ride-hailing capabilities into their applications. ',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);
  }

  await app.listen(4000).then(() => {
    Logger.log('🚀 Gateway Server Successfully started at 4000');
  });
}
bootstrap();
