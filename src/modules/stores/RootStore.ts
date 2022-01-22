import pick from 'lodash.pick'

import { AuthStore } from '@/modules/auth/AuthStore'
import { LocationStore } from '@/modules/geolocation/locationStore'
import { ShiftStore } from '@/modules/shifts/shiftStore'
import { initServices, Services } from '@/modules/stores/services'

export class RootStore {
  services: Services

  authStore: AuthStore

  locationStore: LocationStore

  shiftStore: ShiftStore

  constructor(services = initServices()) {
    this.services = services

    this.authStore = new AuthStore(this, pick(services, ['auth', 'account']))
    this.locationStore = new LocationStore()
    this.shiftStore = new ShiftStore(this, services.shift)
  }
}
