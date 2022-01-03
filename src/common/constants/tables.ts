import { AccountTableConfig } from '@/common/models/Account'
import { RoleTableConfig } from '@/common/models/Role'
import { TimesheetTableConfig } from '@/common/models/Timesheet'

import { TimeCardTableConfig } from '../models/TimeCard'
import { TimesheetEntryTableConfig } from '../models/TimesheetEntry'

export enum TablesEnum {
  USERS = 'Accounts',
  ROLES = 'Roles',
  TIME_CARDS = 'TimeCards',
  TIMESHEETS = 'Timesheets',
  TIMESHEET_ENTRIES = 'TimesheetEntries',
}

export const TableKeys = {
  [TablesEnum.USERS]: 'accounts',
  [TablesEnum.ROLES]: 'roles',
  [TablesEnum.TIME_CARDS]: 'time-cards',
  [TablesEnum.TIMESHEETS]: 'timesheets',
  [TablesEnum.TIMESHEET_ENTRIES]: 'timesheet-entries',
} as const

export type TableName = typeof TableKeys[keyof typeof TableKeys]

export type TableConfigs = {
  [TableKeys.Accounts]: AccountTableConfig
  [TableKeys.Roles]: RoleTableConfig
  [TableKeys.TimeCards]: TimeCardTableConfig
  [TableKeys.Timesheets]: TimesheetTableConfig
  [TableKeys.TimesheetEntries]: TimesheetEntryTableConfig
}

export type PrimaryKeyOf<T extends TableName> = TableConfigs[T]['primaryKey']
