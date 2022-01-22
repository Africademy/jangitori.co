export enum TablesEnum {
  ACCOUNTS = 'Accounts',
  ROLES = 'Roles',
  TIMESHEETS = 'Timesheets',
  TIMESHEET_ENTRIES = 'TimeEntries',
  SHIFTS = 'Shifts',
}

export const TableKeys = {
  [TablesEnum.ACCOUNTS]: 'accounts',
  [TablesEnum.ROLES]: 'roles',
  [TablesEnum.TIMESHEETS]: 'timesheets',
  [TablesEnum.TIMESHEET_ENTRIES]: 'time-entries',
  [TablesEnum.SHIFTS]: 'shifts',
} as const

export type TableName = typeof TableKeys[keyof typeof TableKeys]
