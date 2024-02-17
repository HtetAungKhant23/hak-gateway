import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductModule } from 'src/product/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // ? this is global config to know variables from env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ClientsModule.register([
      {
        name: 'CART_SERVICE',
        transport: Transport.REDIS,
        options: {
          // host: 'localhost',
          // port: 6379,
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_PORT,
          password: process.env.REDIS_PASSWORD,
        },
      },
    ]),
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
