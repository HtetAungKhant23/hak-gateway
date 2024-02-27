import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBrandDto } from './dto/brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  async create(dto: CreateBrandDto) {
    return this.client.send({ cmd: 'create-brand' }, dto);
  }

  async fetchAll() {
    return this.client.send({ cmd: 'fetch-brands' }, {});
  }

  async fetchDetail(id: string) {
    return this.client.send({ cmd: 'fetch-brand-detail' }, { id });
  }

  async update(id: string, dto: CreateBrandDto) {
    return this.client.send({ cmd: 'update-brand' }, { id, ...dto });
  }

  async delete(id: string) {
    return this.client.send({ cmd: 'delete-brand' }, { id });
  }
}
