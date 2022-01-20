import { configure } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

import { AuthStore } from '@/modules/auth/AuthStore'
import { isBrowser, isServer } from '@/modules/lib/environment'
import services, { Services } from '@/modules/services/services'

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
