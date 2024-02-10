import { RpcException } from '@nestjs/microservices';

export class CustomRpcException extends RpcException {
  constructor(statusCode: number, messageEn: string, messageMm: string) {
    super({
      statusCode: statusCode,
      error: statusCode >= 200 && statusCode <= 300 ? false : true,
      messageEn: messageEn,
      messageMm: messageMm,
      body: null,
    });
  }
}
