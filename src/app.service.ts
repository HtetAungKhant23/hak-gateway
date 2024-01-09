import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JsonType } from './app.controller';

@Injectable()
export class AppService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  getHello() {
    console.log('hay');
    console.log(this.client);
    return this.client.send({ cmd: 'test_ms' }, 'fck yes!!!!');
  }

  setJSON(data: JsonType) {
    console.log('let set it baby');
    return this.client.send({ cmd: 'redis-set' }, data);
  }

  getJSON() {
    console.log('let get it baby');
    return this.client.send({ cmd: 'redis-get' }, {});
  }
}
