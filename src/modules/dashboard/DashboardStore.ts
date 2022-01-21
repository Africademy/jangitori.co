import { action, makeAutoObservable } from 'mobx'
import Router from 'next/router'

import { routes } from '@/lib/routes'

import { RootStore } from '../stores'
import { TimesheetDetailsQuery } from '../timesheets/timesheetDetailsQuery'
import { BaseTabKey, getDashboardTabsForRole, getTabKeyForIndex } from './tabs'

export default class DashboardStore<TabKey extends BaseTabKey = BaseTabKey> {
  tabIndex = 0
  timesheetDetailsQuery: TimesheetDetailsQuery | Falsy = null

  get tabKeys(): TabKey[] {
    const role = this.root.getAccountRole()
    return getDashboardTabsForRole(role) as TabKey[]
  }

  get tabKey(): TabKey {
    const tabs = this.tabKeys
    return tabs[this.tabIndex]
  }

  routeTo(value: TabKey, filter?: TimesheetDetailsQuery) {
    if (!Router.router?.isReady) {
      console.log(
        '❗ WARNING: Router is not ready but called DashboardStore.routeTo()',
      )
    }

    const role = this.root.getAccountRole()
    const tabKeys = this.tabKeys
    const tab = value

    const filterUrl = filter ? `?payPeriodEnd=${filter.payPeriodEnd}` : ``
    this.timesheetDetailsQuery = filter
    if (typeof tab === 'number') {
      this.tabIndex = tab

      Router.router?.push(
        routes.dashboardPage(role, getTabKeyForIndex(tab, tabKeys) + filterUrl),
      )
    } else {
      this.tabIndex = tabKeys.indexOf(tab)
      Router.router?.push(routes.dashboardPage(role, tab) + filterUrl)
    }
  }

  constructor(private root: RootStore) {
    this.tabIndex = 0

    makeAutoObservable(
      this,
      { routeTo: action.bound },
      { name: 'DashboardStore' },
    )
  }
}
