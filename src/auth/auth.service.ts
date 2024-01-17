import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create.auth.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}
  signup(dto: CreateAuthDto) {
    return this.client.send({ cmd: 'signup' }, dto);
  }

  login(dto: { email: string; password: string }) {
    return this.client.send({ cmd: 'login' }, dto);
  }
}
