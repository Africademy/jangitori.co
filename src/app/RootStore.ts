import { configure } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

import { Services, services } from '@/app/services'
import { isBrowser, isServer } from '@/lib/environment'
import { AuthStore } from '@/modules/auth/AuthStore'

enableStaticRendering(isServer())

configure({
  enforceActions: 'observed',
  reactionRequiresObservable: isBrowser(),
  disableErrorBoundaries: false,
})

export class RootStore {
  services: Services = services
  /* Domain Stores */
  authStore: AuthStore = new AuthStore(this)
}
