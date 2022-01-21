import { action, makeAutoObservable, reaction, transaction } from 'mobx'
import Router from 'next/router'

import { routes } from '@/lib/routes'
import { RoleID } from '@/modules/models/Role'
import { TimesheetsQuery } from '@/modules/timesheets/timesheetQueryKeys'

import { getIndexOfTabKey, getTabKeyForIndex } from './tabs'

export default class DashboardStore<TabKey extends string> {
  tabIndex = 0
  query: TimesheetsQuery | null = null

  setQuery(query: TimesheetsQuery | null) {
    this.query = query
  }

  setTab(value: number) {
    this.tabIndex = value
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
      tabKeys: Record<TabKey, TabKey>
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
