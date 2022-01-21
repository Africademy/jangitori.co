import { action, makeAutoObservable, reaction, transaction } from 'mobx'
import Router from 'next/router'

import { routes } from '@/lib/routes'
import { RoleID } from '@/modules/models/Role'

import { RootStore } from '../stores'
import { TimesheetDetailsQuery } from '../timesheets/timesheetDetailsQuery'
import { getIndexOfTabKey } from './tabs'

export type BaseTabKey = 'overview' | string

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

  get tabKey(): TabKey {
    return this.tabKeys[this.tabIndex]
  }

  routeTo(tab: TabKey) {
    this.setTabKey(tab)
    const role = this.root.getAccountRole()
    Router.router?.push(routes.dashboardPage(role, tab))
  }

  constructor(
    private root: RootStore,
    private tabKeys = ['overview'] as TabKey[],
  ) {
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
