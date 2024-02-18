import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { env } from 'src/configs/env-config';

@Module({
  imports: [
    // ? this is global config to know variables from env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // ? ensure that the verify phase performed by Passport, and the sign phase performed in our AuthService, use a common secret.
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.REDIS,
        options: {
          // host: 'localhost',
          // port: 6379,
          host: env.host,
          port: env.port,
          ...(env.password && { password: env.password }),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
