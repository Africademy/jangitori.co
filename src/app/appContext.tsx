import { useContext } from 'react'

import { RootStoreContext } from './RootStoreContext'
import { Services } from './services'

export function useRootStore() {
  const context = useContext(RootStoreContext)
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider')
  }

  return context
}

export function useServices<K extends keyof Services>(
  ...keys: K[]
): Pick<Services, K> {
  const { services } = useRootStore()

  const result = {} as Pick<Services, K>
  keys.forEach((key) => (result[key] = services[key]))
  return result
}
