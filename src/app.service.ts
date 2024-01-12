import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JsonType } from './app.controller';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly product: ClientProxy,
  ) {}

  getHello() {
    console.log('this is product');
    console.log(this.product);
    return this.product.send({ cmd: 'multi-test' }, 'fck yes!!!!');
  }

  setJSON(data: JsonType) {
    console.log('let set it baby');
    return this.client.send({ cmd: 'redis-set' }, data);
  }

  getJSON(data: string) {
    console.log('let get it baby', data);
    console.log(this.client);
    return this.client.send({ cmd: 'redis-get' }, data);
  }
}
