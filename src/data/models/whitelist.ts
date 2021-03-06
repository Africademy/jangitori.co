import { RoleId } from '@/data/models/role'

export interface Whitelist {
  phone: string
  firstName: string
  lastName: string
  role: RoleId
  email: string
}

export const WHITELISTS_TABLE = 'whitelists' as const
