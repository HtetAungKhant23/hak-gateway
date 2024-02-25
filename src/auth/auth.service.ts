import { Inject, Injectable } from '@nestjs/common';
import { LoginDto, SignupDto } from './dto/create.auth.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  signup(dto: SignupDto) {
    return this.client.send({ cmd: 'sign-up' }, dto);
  }

  login(dto: LoginDto) {
    return this.client.send({ cmd: 'sign-in' }, dto);
  }
}
