import { createContext, useContext } from 'react'

import { RootStore } from './RootStore'
import { Services } from './services'

export const RootStoreContext = createContext<RootStore | undefined>(undefined)

export function useRootStore() {
  const context = useContext(RootStoreContext)
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider')
  }

  return context
}

export function useAuthStore() {
  return useRootStore().authStore
}

export function useDashboardStore() {
  return useRootStore().dashboardStore
}

export function useTimeClockStore() {
  return useRootStore().timeClockStore
}

export function useServices<K extends keyof Services>(
  ...keys: K[]
): Pick<Services, K> {
  const { services } = useRootStore()

  const result = {} as Pick<Services, K>
  keys.forEach((key) => (result[key] = services[key]))
  return result
}
