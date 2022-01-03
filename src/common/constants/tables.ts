import { AccountTableConfig } from '@/common/models/Account'
import { RoleTableConfig } from '@/common/models/Role'
import { TimesheetTableConfig } from '@/common/models/Timesheet'
import { TimesheetEntryTableConfig } from '@/common/models/TimesheetEntry'

export enum TablesEnum {
  ACCOUNTS = 'Accounts',
  ROLES = 'Roles',
  TIMESHEETS = 'Timesheets',
  TIMESHEET_ENTRIES = 'TimesheetEntries',
}

export const TableKeys = {
  [TablesEnum.ACCOUNTS]: 'accounts',
  [TablesEnum.ROLES]: 'roles',
  [TablesEnum.TIMESHEETS]: 'timesheets',
  [TablesEnum.TIMESHEET_ENTRIES]: 'timesheet-entries',
} as const

export type TableName = typeof TableKeys[keyof typeof TableKeys]

export type TableConfigs = {
  [TableKeys.Accounts]: AccountTableConfig
  [TableKeys.Roles]: RoleTableConfig
  [TableKeys.Timesheets]: TimesheetTableConfig
  [TableKeys.TimesheetEntries]: TimesheetEntryTableConfig
}

export type PrimaryKeyOf<T extends TableName> = TableConfigs[T]['primaryKey']
