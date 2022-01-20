import { AuthStore } from '../auth/AuthStore'
import { initServices, Services } from '../services'

export class RootStore {
  services: Services = initServices()
  /* Domain Stores */
  authStore: AuthStore = new AuthStore(this)
}
