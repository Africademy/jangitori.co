import { action, makeAutoObservable } from 'mobx'
import Router from 'next/router'

import { routes } from '@/lib/routes'

import { RootStore } from '../stores'
import { TimesheetDetailsQuery } from '../timesheets/timesheetDetailsQuery'
import { BaseTabKey, getDashboardTabsForRole, getTabKeyForIndex } from './tabs'

export const dashboardViews = {
  overview: 'overview' as const,
  timesheets: 'timesheets' as const,
  timesheetDetails: (filter: TimesheetDetailsQuery) =>
    [dashboardViews.timesheets, 'details', filter] as const,
}

export type DashboardView =
  | typeof dashboardViews['overview']
  | typeof dashboardViews['timesheets']
  | ReturnType<typeof dashboardViews['timesheetDetails']>

export function isTimesheetDetailsKey(
  o: any,
): o is ReturnType<typeof dashboardViews['timesheetDetails']> {
  return (
    o &&
    Array.isArray(o) &&
    o.length === 3 &&
    o[0] === 'timesheets' &&
    o[1] === 'details' &&
    typeof o[2] === 'object' &&
    'payPeriodEnd' in o[2] &&
    'employee' in o[2]
  )
}

export default class DashboardStore<TabKey extends BaseTabKey = BaseTabKey> {
  view: DashboardView = dashboardViews.overview

  setView(value: DashboardView) {
    this.view = value
  }

  tabIndex = 0

  get timesheetDetailsQuery(): TimesheetDetailsQuery | null {
    const view = this.view
    return isTimesheetDetailsKey(view) ? view[2] : null
  }

  get tabKeys(): TabKey[] {
    const role = this.root.invariantAccount.role
    return getDashboardTabsForRole(role) as TabKey[]
  }

  get tabKey(): TabKey {
    const tabs = this.tabKeys
    return tabs[this.tabIndex]
  }

  routeTo(href: string) {
    if (!Router.router?.isReady) {
      console.log(
        '❗ WARNING: Router is not ready but called DashboardStore.routeToTab()',
      )
    }

    Router.router?.push(href, routes.dashboardPresented(href.split('/')[3]))
  }

  routeToTab(value: TabKey, filter?: TimesheetDetailsQuery) {
    const account = this.root.invariantAccount
    const tabKeys = this.tabKeys
    const tab = value
    const payPeriodEnd = filter?.payPeriodEnd
    const filterUrl = filter
      ? `?employee=${account.uid}&payPeriodEnd=${filter.payPeriodEnd}`
      : ``
    const newView = payPeriodEnd
      ? dashboardViews.timesheetDetails({
          employee: account.uid,
          payPeriodEnd,
        })
      : null

    newView && this.setView(newView)

    if (typeof tab === 'number') {
      this.tabIndex = tab

      this.routeTo(
        routes.dashboardTab(
          account.role,
          getTabKeyForIndex(tab, tabKeys) + filterUrl,
        ),
      )
    } else {
      this.tabIndex = tabKeys.indexOf(tab)
      this.routeTo(routes.dashboardTab(account.role, tab) + filterUrl)
    }
  }

  constructor(private root: RootStore) {
    this.tabIndex = 0

    makeAutoObservable(
      this,
      { routeToTab: action.bound },
      { name: 'DashboardStore' },
    )
  }
}
