import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response.status(status).json({
      meta: {
        success:
          exception.response.statusCode >= 200 &&
          exception.response.statusCode <= 300
            ? true
            : false,
        messageEn:
          exception.response.messageEn ?? exception.response.meta.messageEn,
        messageMm:
          exception.response.messageMm ?? exception.response.meta.messageMm,
      },
      body: null,
    });
  }
}

export class ResponserException extends HttpException {
  constructor(meta: any, statusCode: any) {
    super(meta, statusCode);
  }
}
