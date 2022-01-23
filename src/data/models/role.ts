export enum RolesEnum {
  ADMIN = 'Admin',
  EMPLOYEE = 'Employee',
  SUPERVISOR = 'Supervisor',
}

export const RoleIds = {
  [RolesEnum.ADMIN]: 'admin',
  [RolesEnum.EMPLOYEE]: 'employee',
  [RolesEnum.SUPERVISOR]: 'supervisor',
} as const

export type RoleId = typeof RoleIds[RolesEnum]

export interface Role {
  id: PrimaryKey<RoleId>
  name: RoleId
}
