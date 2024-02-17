import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { AccessControlModule } from './auth/access-control/access-control.module';
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
        name: 'AUTH_SERVICE',
        transport: Transport.REDIS,
        options: {
          // host: 'localhost',
          // port: 6379,
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_PORT,
          password: process.env.REDIS_PASSWORD,
        },
      },
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.REDIS,
        options: {
          // host: 'localhost',
          // host: 'redis-18903.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
          // port: 18903,
          // password: 'LbE3XSIud2xa1ypOgrYWs8yOKfOPZvTw',
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_PORT,
          password: process.env.REDIS_PASSWORD,
        },
      },
      {
        name: 'ORDER_SERVICE',
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
    AccessControlModule,
    AuthModule,
    ProductModule,
    OrderModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
