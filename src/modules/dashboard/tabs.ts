import { ParsedUrlQuery } from 'querystring'

import { normalizeQueryParam } from '@/lib/normalizeQueryParam'

export const TabKeys = {
  overview: 'overview',
  timesheets: 'timesheets',
}

export const tabLabels = {
  [TabKeys.overview]: 'Overview',
  [TabKeys.timesheets]: 'Timesheets',
} as const

export type TabKey = 'overview' | 'timesheets'

export const isTabKey = (o: any): o is TabKey => {
  return typeof o === 'string' && Object.values(TabKeys).includes(o)
}

export function getIndexOfTabKey(key: TabKey): number {
  return Object.values(TabKeys).indexOf(key)
}

export function parseTabKeyQueryParam(query: ParsedUrlQuery): TabKey {
  const tabKey =
    'tabKey' in query ? normalizeQueryParam<TabKey>(query.tabKey) : null
  if (!isTabKey(tabKey)) {
    const error = new Error(`Invalid [tabKey] query param - ${tabKey}`)
    console.error(error)
    throw error
  }
  return tabKey
}

export function getTabKeyForIndex(index: number): TabKey {
  const tabKey = Object.keys(TabKeys)[index]

  if (!tabKey) {
    const error = new Error('Invalid tabKey index ' + index)
    console.error(error)
    throw error
  }

  return tabKey as TabKey
}
