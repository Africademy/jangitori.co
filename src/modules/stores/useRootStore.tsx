import { useContext } from 'react'

import { RootStoreContext } from './RootStore/RootStoreContext'

export function useRootStore() {
  const context = useContext(RootStoreContext)
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider')
  }

  return context
}
