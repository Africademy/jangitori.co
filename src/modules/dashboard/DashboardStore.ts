import { action, makeAutoObservable, reaction, transaction } from 'mobx'
import Router from 'next/router'

import { routes } from '@/lib/routes'
import { RoleID } from '@/modules/models/Role'

import { TimesheetDetailsQuery } from '../timesheets/timesheetDetailsQuery'
import { getIndexOfTabKey, getTabKeyForIndex } from './tabs'

export default class DashboardStore<TabKey extends string = string> {
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

  setTabKey(key: TabKey) {
    const index = getIndexOfTabKey<TabKey>(key, this.props.tabKeys)
    this.setTab(index)
  }

  get tabKey(): TabKey {
    return getTabKeyForIndex<TabKey>(this.tabIndex, this.props.tabKeys)
  }

  constructor(
    private props: {
      role: RoleID
      tabKeys: TabKey[]
    },
  ) {
    this.tabIndex = 0

    makeAutoObservable(
      this,
      { setTab: action.bound, setTabKey: action.bound },
      { name: 'DashboardStore' },
    )

    reaction(
      () => this.tabIndex,
      (tabIndex) => {
        const currentUrl = Router.router?.asPath
        if (!currentUrl) throw new Error('Router.router was null')

        const tabKey = getTabKeyForIndex<TabKey>(tabIndex, props.tabKeys)

        Router.router?.push(
          routes.dashboardPage(this.props.role, tabKey),
          undefined,
          {
            shallow: true,
          },
        )
      },
    )
  }

  dispose() {
    transaction(() => {
      this.tabIndex = 0
    })
  }
}
