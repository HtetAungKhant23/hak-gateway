import { Inject, Injectable } from '@nestjs/common';
import { CreateCartDto, UpdateCartDto } from './dto/create-cart.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartService {
  constructor(
    @Inject('CART_SERVICE') private readonly client: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly pClient: ClientProxy,
    private productService: ProductService,
  ) {}

  async create(dto: CreateCartDto) {
    const tt = this.productService.findOne(dto.productId);
    console.log(tt);
    // return this.cartClient.send({ cmd: 'create-cart' }, dto);
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
