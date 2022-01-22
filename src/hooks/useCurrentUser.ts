import invariant from 'tiny-invariant'

import { Account } from '@/modules/models/Account'
import { useRootStore } from '@/modules/stores'

export function useCurrentUser(): Account {
  const { authStore } = useRootStore()
  const user = authStore.account
  invariant(user, 'user required')
  return user
}
