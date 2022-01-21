import invariant from 'tiny-invariant'

import { AuthStore } from '@/modules/auth/AuthStore'
import { GeolocationStore } from '@/modules/geolocation/GeolocationStore'
import { initServices, Services } from '@/modules/stores/services'

import DashboardStore from '../dashboard/DashboardStore'
import { getDashboardTabsForRole } from '../dashboard/tabs'
import { Account } from '../models/Account'

export class RootStore {
  services: Services = initServices()
  /* Domain Stores */
  authStore: AuthStore = new AuthStore(this)

  geolocationStore: GeolocationStore = new GeolocationStore()

  dashboardStore: DashboardStore = new DashboardStore(this)

  get invariantAccount(): Account {
    const account = this.authStore.account
    invariant(account, 'AuthStore account not found')
    return account
  }

  getDashboardTabs(): string[] {
    const role = this.invariantAccount.role

    const tabs = getDashboardTabsForRole(role)

    return tabs
  }
}
