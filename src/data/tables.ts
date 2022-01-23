import { USERS_TABLE } from '@/data/models/user'

export const Tables = {
  USERS: USERS_TABLE,
  ROLES: 'roles',
  TIMESHEETS: 'timesheets',
  SHIFTS: 'shifts',
  WHITELISTS: 'whitelists',
} as const

export type TableName = keyof typeof Tables
