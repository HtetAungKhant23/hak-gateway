import { Inject, Injectable } from '@nestjs/common';
import { UpdateCartDto } from './dto/create-cart.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CartService {
  constructor(@Inject('CART_SERVICE') private readonly client: ClientProxy) {}

  async create(
    cartItems: { productId: string; unitPrice: number; quantity: number }[],
    userId: string,
  ) {
    return this.client.send({ cmd: 'create-cart' }, { cartItems, userId });
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
