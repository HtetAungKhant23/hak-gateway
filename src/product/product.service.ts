import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}
  async create(dto: CreateProductDto, userId: string) {
    dto['createdBy'] = userId;
    return this.client.send({ cmd: 'create-product' }, dto);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: string) {
    return this.client.send({ cmd: 'fetch-product-detail' }, id);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
