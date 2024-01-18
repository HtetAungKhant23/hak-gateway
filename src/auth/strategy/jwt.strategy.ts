import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
// ? this is work like a middleware for @UseGuard()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log('hh');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { id: string; role: string }) {
    console.log(payload);
    return { ...payload };
  }
}
