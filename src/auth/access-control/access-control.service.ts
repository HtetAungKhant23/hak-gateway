import { Injectable } from '@nestjs/common';
import { Role_Enum } from '../decorator/role.decorator';

interface IsAuthorizedParams {
  currentRole: Role_Enum;
  requiredRole: Role_Enum;
}

@Injectable()
export class AccessControlService {
  private socialOrders: Array<Map<string, number>> = [];
  private priority: number = 1;

  constructor() {
    this.buildRoles([
      Role_Enum.User,
      Role_Enum.Staff,
      Role_Enum.Admin,
      Role_Enum.SuperAdmin,
    ]);
    console.log(this.priority, ' => priority');
  }

  private buildRoles(roles: Role_Enum[]) {
    const order: Map<string, number> = new Map();
    roles.forEach((role) => {
      order.set(role, this.priority);
      this.priority++;
    });
    this.socialOrders.push(order);
  }

  public isAuthorized({
    currentRole,
    requiredRole,
  }: IsAuthorizedParams): boolean {
    for (const order of this.socialOrders) {
      const priority = order.get(currentRole);
      const requiredPriority = order.get(requiredRole);
      if (priority && requiredPriority && priority >= requiredPriority) {
        return true;
      }
    }
    return false;
  }
}
