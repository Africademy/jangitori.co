import { enableLogging } from 'mobx-logger'
import { createContext } from 'react'

import { isDevelopment } from '@/common/utils/environment'

import { RootStore } from './RootStore'

if (isDevelopment()) {
  enableLogging()
}

export const RootStoreContext = createContext<RootStore | undefined>(undefined)
