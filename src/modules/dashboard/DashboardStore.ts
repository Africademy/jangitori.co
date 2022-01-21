import { action, makeAutoObservable, transaction } from 'mobx'
import Router from 'next/router'

import { routes } from '@/lib/routes'

import { RootStore } from '../stores'
import { TimesheetDetailsQuery } from '../timesheets/timesheetDetailsQuery'
import {
  BaseTabKey,
  getDashboardTabsForRole,
  getIndexOfTabKey,
  getTabKeyForIndex,
} from './tabs'

export default class DashboardStore<TabKey extends BaseTabKey = BaseTabKey> {
  tabIndex = 0
  timesheetDetailsQuery: TimesheetDetailsQuery | null = null

  setTimesheetDetailsQuery(query: TimesheetDetailsQuery | null) {
    this.timesheetDetailsQuery = query
  }

  setTab(value: number) {
    this.tabIndex = value
  }

  setTabKey(key: TabKey) {
    const index = getIndexOfTabKey<TabKey>(key, this.tabKeys)
    this.setTab(index)
  }

  clearQueries() {
    this.timesheetDetailsQuery = null
  }

  get tabKeys(): TabKey[] {
    const role = this.root.getAccountRole()
    return getDashboardTabsForRole(role) as TabKey[]
  }

  get tabKey(): TabKey {
    const tabs = this.tabKeys
    return tabs[this.tabIndex]
  }

  routeToIndex(tab: number) {
    this.setTab(tab)
    const role = this.root.getAccountRole()
    const tabKeys = this.tabKeys
    Router.router?.push(
      routes.dashboardPage(role, getTabKeyForIndex(tab, tabKeys)),
    )
  }

  routeTo(tab: TabKey | number) {
    if (typeof tab === 'number') return this.routeToIndex(tab)
    this.setTabKey(tab)
    const role = this.root.getAccountRole()
    Router.router?.push(routes.dashboardPage(role, tab))
  }

  constructor(private root: RootStore) {
    this.tabIndex = 0

    makeAutoObservable(
      this,
      { setTab: action.bound, setTabKey: action.bound },
      { name: 'DashboardStore' },
    )
  }

  dispose() {
    transaction(() => {
      this.tabIndex = 0
    })
  }
}
