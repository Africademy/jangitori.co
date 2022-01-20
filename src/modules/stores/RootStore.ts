import { AuthStore } from '@/modules/auth/AuthStore'
import { GeolocationStore } from '@/modules/geolocation/GeolocationStore'
import { initServices, Services } from '@/modules/services'

export class RootStore {
  services: Services = initServices()
  /* Domain Stores */
  authStore: AuthStore = new AuthStore(this)

  geolocationStore: GeolocationStore = new GeolocationStore()
}
