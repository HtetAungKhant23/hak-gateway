import { Inject, Injectable } from '@nestjs/common';
import { InviteStaff, LoginDto, SignupDto } from './dto/create.auth.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  invite(dto: InviteStaff) {
    return this.client.send({ cmd: 'invite-staff' }, dto);
  }

  signup(dto: SignupDto) {
    return this.client.send({ cmd: 'signup' }, dto);
  }

  login(dto: LoginDto) {
    return this.client.send({ cmd: 'login' }, dto);
  }
}
