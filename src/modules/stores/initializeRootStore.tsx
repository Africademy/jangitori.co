import { configure } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

import { isBrowser, isDevelopment, isServer } from '@/lib/environment'

enableStaticRendering(isServer())

configure({
  enforceActions: 'observed',
  reactionRequiresObservable: isBrowser(),
  disableErrorBoundaries: false,
})

// import { enableLogging } from 'mobx-logger'

import { RootStore } from './RootStore'

// if (isDevelopment()) {
//   enableLogging()
// }

export let rootStoreInstance: RootStore

export function initializeStore(): RootStore {
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
