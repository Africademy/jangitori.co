import { Account } from '@/common/models/Account'
import RootStore from '@/modules/stores/RootStore'

export type AuthenticatedPageProps<P = {}> = {
  account: Account
  store: RootStore
} & P
