import { Account } from '@/modules/models/Account'
import { RootStore } from '@/modules/stores'

export type AuthenticatedPageProps<P = {}> = {
  account: Account
  store: RootStore
} & P
