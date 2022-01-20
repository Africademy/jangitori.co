import { Account } from '@/db/models/Account'
import RootStore from '@/modules/stores/RootStore'

export type AuthenticatedPageProps<P = {}> = {
  account: Account
  store: RootStore
} & P
