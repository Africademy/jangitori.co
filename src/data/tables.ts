import { USERS_TABLE } from '@/data/models/user'
import { ROLES_TABLE } from '@/data/models/role'
import { SHIFTS_TABLE } from '@/data/models/shift'
import { TIMESHEETS_TABLE } from '@/data/models/timesheet'
import { WHITELISTS_TABLE } from '@/data/models/whitelist'

export const Tables = {
  USERS: USERS_TABLE,
  ROLES: ROLES_TABLE,
  TIMESHEETS: TIMESHEETS_TABLE,
  SHIFTS: SHIFTS_TABLE,
  WHITELISTS: WHITELISTS_TABLE,
} as const

export type TableName = keyof typeof Tables
