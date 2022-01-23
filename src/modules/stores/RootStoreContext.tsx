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

export function useLocationStore() {
  return useRootStore().locationStore
}

export function useAuthStore() {
  return useRootStore().authStore
}

export function useShiftStore() {
  return useRootStore().shiftStore
}

export function useServices(): Services {
  const { services } = useRootStore()
  return services
}

export function useAuthService() {
  return useRootStore().services.auth
}

export function useAccountService() {
  return useRootStore().services.account
}
