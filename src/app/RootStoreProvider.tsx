import { ReactNode, useMemo } from 'react'

import { RootStore } from './RootStore'
import { RootStoreContext } from './RootStoreContext'

export let rootStoreInstance: RootStore

function initializeStore(): RootStore {
  const isServer = typeof window === 'undefined'
  const _store = rootStoreInstance ?? new RootStore()

  // For SSG and SSR always create a new store
  if (isServer) return _store
  // Create the store once in the client
  if (!rootStoreInstance) {
    rootStoreInstance = _store
  }

  return _store
}

export default function RootStoreProvider({
  children,
}: {
  children: ReactNode
}) {
  const store = useMemo(initializeStore, [])

  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  )
}

RootStoreProvider.displayName = 'RootStoreProvider'
