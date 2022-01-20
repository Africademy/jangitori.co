import { ParsedUrlQuery } from 'querystring'

import { normalizeQueryParam } from '@/modules/lib/normalizeQueryParam'

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

export function parseTabKeyQueryParam(query: ParsedUrlQuery): TabKey | null {
  const tabKey =
    'tabKey' in query ? normalizeQueryParam<TabKey>(query.tabKey) : null
  if (!isTabKey(tabKey)) {
    console.log(`WARNING: Invalid [tabKey] query param - ${tabKey}`)
  }
  return tabKey
}

export function getTabKeyForIndex(index: number): TabKey {
  const tabKey = Object.keys(TabKeys).at(index)
  console.log(
    'getTabKeyForIndex() for index=' + index + ' got tabKey=' + tabKey,
  )

  if (!tabKey) throw new Error('Invalid tabKey index ' + index)

  return tabKey as TabKey
}
