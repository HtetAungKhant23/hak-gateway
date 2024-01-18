import { SetMetadata } from '@nestjs/common';

export const Role_Key = 'role';
export const Roles = (role: 'Admin' | 'User') => SetMetadata(Role_Key, role);
