import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
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
    return this.client.send({ cmd: 'fetch-products' }, '');
  }

  async findOne(id: string) {
    return this.client.send({ cmd: 'fetch-product-detail' }, id);
  }

  async update(id: string, dto: UpdateProductDto) {
    return this.client.send({ cmd: 'update-product' }, { id, ...dto });
  }

  async remove(id: string) {
    return this.client.send({ cmd: 'delete-product' }, id);
  }
}
