export enum RolesEnum {
  ADMIN = 'Admin',
  EMPLOYEE = 'Employee',
  SUPERVISOR = 'Supervisor',
}

export const RoleIDs = {
  [RolesEnum.ADMIN]: 'admin',
  [RolesEnum.EMPLOYEE]: 'employee',
  [RolesEnum.SUPERVISOR]: 'supervisor',
} as const

export type RoleID = typeof RoleIDs[RolesEnum]

export interface Role {
  id: PrimaryKey<RoleID>
  name: RoleID
}
