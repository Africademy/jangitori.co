import { createContext, useContext } from 'react'

import { RootStore } from './RootStore'

export const RootStoreContext = createContext<RootStore | undefined>(undefined)

export function useRootStore() {
  const context = useContext(RootStoreContext)
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider')
  }

  return context
}

import { Services } from '@/modules/services'

export function useServices<K extends keyof Services>(
  ...keys: K[]
): Pick<Services, K> {
  const { services } = useRootStore()

  const result = {} as Pick<Services, K>
  keys.forEach((key) => (result[key] = services[key]))
  return result
}