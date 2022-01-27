import { RoleId } from '@/data/models/role'

export type User<R extends RoleId = RoleId> = {
  id: string
  firstName: string
  lastName: string
  role: R
  phone: string
  email: PrimaryKey<string>
  updatedAt: Timestamp
}

export const USERS_TABLE = 'users' as const
