import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role_Key } from '../decorator/role.decorator';

export type currentUserDto = {
  id: string;
  role: 'Admin' | 'User';
};

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // ? when an endpoint has @UseGuard(RoleGuard), get the value of arg in @Roles() decorator and then return that value
    const requiredRoles = this.reflector.getAllAndOverride<'Admin' | 'User'>(
      Role_Key,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();
    const currentUser = request['user'] as currentUserDto;

    if (currentUser.role === requiredRoles) {
      return true;
    }
    return false;
  }
}
