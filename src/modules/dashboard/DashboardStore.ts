import { action, makeAutoObservable, transaction } from 'mobx'
import Router from 'next/router'

import { routes } from '@/lib/routes'

import { RootStore } from '../stores'
import { TimesheetDetailsQuery } from '../timesheets/timesheetDetailsQuery'
import { BaseTabKey, getDashboardTabsForRole, getTabKeyForIndex } from './tabs'

export default class DashboardStore<TabKey extends BaseTabKey = BaseTabKey> {
  tabIndex = 0
  timesheetDetailsQuery: TimesheetDetailsQuery | null = null

  setTimesheetDetailsQuery(query: TimesheetDetailsQuery | null) {
    this.timesheetDetailsQuery = query
  }

  setTab(value: number) {
    this.tabIndex = value
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

  routeTo(tab: TabKey | number) {
    if (!Router.router?.isReady) {
      console.log(
        '❗ WARNING: Router is not ready but called DashboardStore.routeTo()',
      )
    }
    const role = this.root.getAccountRole()
    const tabKeys = this.tabKeys
    let path = ''
    let newTabIndex = this.tabIndex
    if (typeof tab === 'number') {
      newTabIndex = tab
      path = getTabKeyForIndex(tab, tabKeys)
    } else {
      path = tab
      newTabIndex = tabKeys.indexOf(tab)
    }
    this.setTab(newTabIndex)
    this.clearQueries()
    Router.router?.push(routes.dashboardPage(role, path))
  }

  constructor(private root: RootStore) {
    this.tabIndex = 0

    makeAutoObservable(
      this,
      { setTab: action.bound, routeTo: action.bound },
      { name: 'DashboardStore' },
    )
  }

  dispose() {
    transaction(() => {
      this.tabIndex = 0
    })
  }
}
