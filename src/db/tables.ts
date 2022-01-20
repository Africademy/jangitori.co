import { AccountTableConfig } from '@/db/models/Account'
import { RoleTableConfig } from '@/db/models/Role'
import { EntryTableConfig } from '@/db/models/TimeEntry'
import { TimesheetTableConfig } from '@/db/models/Timesheet'

export enum TablesEnum {
  ACCOUNTS = 'Accounts',
  ROLES = 'Roles',
  TIMESHEETS = 'Timesheets',
  TIMESHEET_ENTRIES = 'TimeEntries',
}

export const TableKeys = {
  [TablesEnum.ACCOUNTS]: 'accounts',
  [TablesEnum.ROLES]: 'roles',
  [TablesEnum.TIMESHEETS]: 'timesheets',
  [TablesEnum.TIMESHEET_ENTRIES]: 'time-entries',
} as const

export type TableName = typeof TableKeys[keyof typeof TableKeys]

export type TableConfigs = {
  [TableKeys.Accounts]: AccountTableConfig
  [TableKeys.Roles]: RoleTableConfig
  [TableKeys.Timesheets]: TimesheetTableConfig
  [TableKeys.TimeEntries]: EntryTableConfig
}

export type PrimaryKeyOf<T extends TableName> = TableConfigs[T]['primaryKey']
