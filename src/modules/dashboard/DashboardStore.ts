import { action, makeAutoObservable, reaction, transaction } from 'mobx'
import Router from 'next/router'

import { RoleID } from '@/domains/models/Role'
import { TimesheetsQuery } from '@/domains/timesheets/timesheetQueryKeys'
import { routes } from '@/lib/routes'

import { getIndexOfTabKey, getTabKeyForIndex, TabKey } from './tabs'

export default class DashboardStore {
  tabIndex = 0
  query: TimesheetsQuery | null = null

  setQuery(query: TimesheetsQuery | null) {
    this.query = query
  }

  setTab(value: number) {
    this.tabIndex = value
  }

  setTabKey(key: TabKey) {
    const index = getIndexOfTabKey(key)
    this.setTab(index)
  }

  get tabKey(): TabKey {
    return getTabKeyForIndex(this.tabIndex)
  }

  constructor(private props: { role: RoleID; initialTabKey: TabKey }) {
    this.tabIndex = getIndexOfTabKey(props.initialTabKey)

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

        const tabKey = getTabKeyForIndex(tabIndex)

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
