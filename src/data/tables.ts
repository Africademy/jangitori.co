import { ACCOUNTS_TABLE } from './models/account'

export const Tables = {
  ACCOUNTS: ACCOUNTS_TABLE,
  ROLES: 'roles',
  TIMESHEETS: 'timesheets',
  SHIFTS: 'shifts',
  WHITELISTS: 'whitelists',
} as const

export type TableName = keyof typeof Tables
