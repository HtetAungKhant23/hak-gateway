import { SetMetadata } from '@nestjs/common';

export const Role_Key = 'role';
export const Roles = (role: 'SuperAdmin' | 'User') =>
  SetMetadata(Role_Key, role);
