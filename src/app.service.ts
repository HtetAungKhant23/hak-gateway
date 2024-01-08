import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  getHello() {
    console.log('hay');
    console.log(this.client);
    return this.client.send({ cmd: 'test_ms' }, 'fck yes!!!!');
  }
}
