import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  create(dto: CreateCategoryDto) {
    return this.client.send({ cmd: 'create-category' }, dto);
  }

  findAll() {
    return this.client.send({ cmd: 'fetch-categories' }, {});
  }

  findOne(id: string) {
    return this.client.send({ cmd: 'fetch-category-detail' }, id);
  }

  update(id: string, dto: CreateCategoryDto) {
    return this.client.send({ cmd: 'update-category' }, { id, ...dto });
  }

  remove(id: string) {
    return this.client.send({ cmd: 'delete-category' }, id);
  }
}
