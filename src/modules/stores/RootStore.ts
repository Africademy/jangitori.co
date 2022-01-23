import pick from 'lodash.pick'

import { AuthStore } from '@/modules/auth/AuthStore'
import { LocationStore } from '@/modules/geolocation/locationStore'
import { ShiftStore } from '@/modules/shifts/shiftStore'
import { initServices } from '@/modules/stores/services'

export class RootStore {
  services = initServices()

  authStore: AuthStore

  locationStore: LocationStore

  shiftStore: ShiftStore

  constructor() {
    const services = this.services
    this.authStore = new AuthStore(this, pick(services, ['auth', 'account']))
    this.locationStore = new LocationStore()
    this.shiftStore = new ShiftStore(this, services.shift)
  }
}
