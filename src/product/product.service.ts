import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}
  async create(dto: CreateProductDto) {
    return this.client.send({ cmd: 'create-product' }, dto);
  }

  async findAll() {
    return this.client.send({ cmd: 'fetch-all-product' }, '');
  }

  async findOne(id: string) {
    return this.client.send({ cmd: 'fetch-product-detail' }, id);
  }

  async remove(id: number) {
    return this.client.send({ cmd: 'delete-product' }, id);
  }
}
