import { SetMetadata } from '@nestjs/common';

export enum Role_Enum {
  SuperAdmin = 'superAdmin',
  Admin = 'admin',
  Staff = 'staff',
  User = 'user',
}

export const Role_Key = 'roles';
export const Roles = (...roles: Role_Enum[]) => SetMetadata(Role_Key, roles);
