import { UserType } from '@/lib/types/UserType'

import { RoleId } from './role'

export const ACCOUNTS_TABLE = 'accounts' as const

export type BaseAccount<R extends string = string> = {
  firstName: string
  lastName: string
  role: R | UserType
  phone: string
  email: PrimaryKey<string>
  updatedAt: Timestamp
}

export interface OnboardedAccount<R extends string = string>
  extends BaseAccount<R> {
  uid: string
}

export interface InitialAccount<R extends string = string>
  extends BaseAccount<R> {
  uid: null
}

export type Account<R extends RoleId = RoleId> = OnboardedAccount<R> & {
  role: RoleId
}

export type AccountUpdateData = Omit<Account, 'updatedAt' | 'role'>
