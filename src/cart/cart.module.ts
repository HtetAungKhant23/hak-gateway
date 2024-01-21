import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CART_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService, ProductService],
})
export class CartModule {}
