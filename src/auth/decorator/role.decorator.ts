import { SetMetadata } from '@nestjs/common';

export enum Role_Enum {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Staff = 'Staff',
  User = 'User',
}

export const Role_Key = 'roles';
export const Roles = (...roles: Role_Enum[]) => SetMetadata(Role_Key, roles);
