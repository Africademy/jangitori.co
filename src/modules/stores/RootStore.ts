import invariant from 'tiny-invariant'

import { AuthStore } from '@/modules/auth/AuthStore'
import { GeoLocationStore } from '@/modules/geolocation/geoLocationStore'
import { initServices, Services } from '@/modules/stores/services'

import DashboardStore from '../dashboard/DashboardStore'
import { getDashboardTabsForRole } from '../dashboard/tabs'
import { Account } from '../models/Account'
import { TimeClockStore } from '../timeClock/timeClockStore'

export class RootStore {
  services: Services = initServices()
  /* Domain Stores */
  authStore: AuthStore = new AuthStore(this)

  geolocationStore: GeoLocationStore = new GeoLocationStore()

  dashboardStore: DashboardStore = new DashboardStore(this)

  timeClockStore: TimeClockStore = new TimeClockStore(this)

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
