import { enableLogging } from 'mobx-logger'
import { createContext } from 'react'

import { isDevelopment } from '@/modules/lib/environment'

import { RootStore } from './RootStore'

if (isDevelopment()) {
  enableLogging()
}

export const RootStoreContext = createContext<RootStore | undefined>(undefined)
