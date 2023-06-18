import { user_role_enum } from '@prisma/client';

export type Roles = typeof user_role_enum;
export type Role = keyof Roles;