import { AuthStore } from '@/modules/auth/AuthStore'
import DashboardStore from '@/modules/dashboard/DashboardStore'
import { LocationStore } from '@/modules/geolocation/locationStore'
import { ShiftStore } from '@/modules/shifts/shiftStore'
import { initServices, Services } from '@/modules/stores/services'

export class RootStore {
  services: Services = initServices()

  authStore: AuthStore = new AuthStore(this)

  locationStore: LocationStore = new LocationStore()

  dashboardStore: DashboardStore = new DashboardStore(this)

  shiftStore: ShiftStore = new ShiftStore(this)
}
