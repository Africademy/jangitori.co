import { RootStore } from '@/app/store'
import { Account } from '@/modules/models/Account'

export type AuthenticatedPageProps<P = {}> = {
  account: Account
  store: RootStore
} & P
