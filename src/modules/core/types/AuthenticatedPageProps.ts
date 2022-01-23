import { Account } from '@/data/models/account'

export type AuthenticatedPageProps<P = {}> = {
  account: Account
} & P
