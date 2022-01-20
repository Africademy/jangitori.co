import { ReactNode, useMemo } from 'react'

import { initializeStore } from './RootStore'
import { RootStoreContext } from './RootStoreContext'

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
