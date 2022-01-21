import invariant from 'tiny-invariant'

import { AuthStore } from '@/modules/auth/AuthStore'
import { GeolocationStore } from '@/modules/geolocation/GeolocationStore'
import { initServices, Services } from '@/modules/stores/services'

import DashboardStore from '../dashboard/DashboardStore'
import { getDashboardTabsForRole } from '../dashboard/tabs'
import { Role } from '../models/Role'

export class RootStore {
  services: Services = initServices()
  /* Domain Stores */
  authStore: AuthStore = new AuthStore(this)

  geolocationStore: GeolocationStore = new GeolocationStore()

  dashboardStore: DashboardStore = new DashboardStore(this)

  getAccountRole(): Role['id'] {
    const role = this.authStore.account?.role
    invariant(role, 'AuthStore account not found')
    return role
  }

  getDashboardTabs(): string[] {
    const role = this.getAccountRole()

    const tabs = getDashboardTabsForRole(role)

    return tabs
  }
}
