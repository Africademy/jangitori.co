import { AccountTableConfig } from '@/domains/models/Account'
import { RoleTableConfig } from '@/domains/models/Role'
import { EntryTableConfig } from '@/domains/models/TimeEntry'
import { TimesheetTableConfig } from '@/domains/models/Timesheet'

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
