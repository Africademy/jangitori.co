import { Account } from '@/modules/models/Account'

export type AuthenticatedPageProps<P = {}> = {
  account: Account
} & P
