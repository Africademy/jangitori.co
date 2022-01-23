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
