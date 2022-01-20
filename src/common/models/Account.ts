import { PrimaryKeyOf } from '@/api/tables'
import { UserType } from '@/common/utils/interfaces/UserType'

import { RoleID } from './Role'

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

export type Account<R extends RoleID = RoleID> = OnboardedAccount<R> & {
  role: RoleID
}

export type AccountTableConfig = {
  schema: Account
  primaryKey: 'email'
}

export type AccountUpdateData = Omit<
  Account,
  PrimaryKeyOf<'accounts'> | 'updatedAt' | 'role'
>
