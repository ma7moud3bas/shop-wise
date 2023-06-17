import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/user-roles.enum';

export const ROLES_KEY = 'roles';

export function Roles(roles: Role | Role[]): any {
    return SetMetadata(ROLES_KEY, roles);
}