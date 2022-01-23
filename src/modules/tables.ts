export enum TablesEnum {
  ACCOUNTS = 'Accounts',
  ROLES = 'Roles',
  TIMESHEETS = 'Timesheets',
  SHIFTS = 'Shifts',
}

export const TableKeys = {
  [TablesEnum.ACCOUNTS]: 'accounts',
  [TablesEnum.ROLES]: 'roles',
  [TablesEnum.TIMESHEETS]: 'timesheets',
  [TablesEnum.SHIFTS]: 'shifts',
} as const

export type TableName = typeof TableKeys[keyof typeof TableKeys]
