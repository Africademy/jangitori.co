import { AccountTableConfig } from '@/modules/models/Account'
import { RoleTableConfig } from '@/modules/models/Role'
import { EntryTableConfig } from '@/modules/models/TimeEntry'
import { TimesheetTableConfig } from '@/modules/models/Timesheet'

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

export type TableConfigs = {
  [TableKeys.Accounts]: AccountTableConfig
  [TableKeys.Roles]: RoleTableConfig
  [TableKeys.Timesheets]: TimesheetTableConfig
  [TableKeys.TimeEntries]: EntryTableConfig
  [TableKeys.Shifts]: ShiftsTableConfig
}

export type PrimaryKeyOf<T extends TableName> = TableConfigs[T]['primaryKey']
