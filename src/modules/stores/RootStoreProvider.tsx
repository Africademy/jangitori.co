import { when } from 'mobx'
import { ReactNode, useEffect, useMemo } from 'react'

import { initializeStore } from './initializeRootStore'
import { RootStoreContext } from './RootStoreContext'

export default function RootStoreProvider({
  children,
}: {
  children: ReactNode
}) {
  const store = useMemo(initializeStore, [])

  useEffect(() => {
    store.locationStore.init()
    store.authStore.init()
    return when(
      () => Boolean(store.authStore.user),
      () => store.shiftStore.init(),
    )
  }, [])

  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  )
}

RootStoreProvider.displayName = 'RootStoreProvider'
