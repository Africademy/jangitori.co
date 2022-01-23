import invariant from 'tiny-invariant'

import { User } from '@/data/models/user'
import { useRootStore } from '@/modules/stores'

export function useCurrentUser(): User {
  const { authStore } = useRootStore()
  const user = authStore.user
  invariant(user, 'user required')
  return user
}
