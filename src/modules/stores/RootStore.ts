import invariant from 'tiny-invariant'

import { AuthStore } from '@/modules/auth/AuthStore'
import { LocationStore } from '@/modules/geolocation/locationStore'
import { initServices, Services } from '@/modules/stores/services'

import DashboardStore from '../dashboard/DashboardStore'
import { getDashboardTabsForRole } from '../dashboard/tabs'
import { Account } from '../models/Account'
import { ShiftsStore } from '../timeClock/shiftsStore'

export class RootStore {
  services: Services = initServices()
  /* Domain Stores */
  authStore: AuthStore = new AuthStore(this)

  locationStore: LocationStore = new LocationStore()

  dashboardStore: DashboardStore = new DashboardStore(this)

  shiftsStore: ShiftsStore = new ShiftsStore(this)

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
