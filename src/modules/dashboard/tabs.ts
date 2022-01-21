import { ParsedUrlQuery } from 'querystring'

import { normalizeQueryParam } from '@/lib/normalizeQueryParam'

export const isTabKey = <TabKey extends string>(
  o: any,
  tabKeys: Record<TabKey, TabKey>,
): o is TabKey => {
  return typeof o === 'string' && Object.values(tabKeys).includes(o)
}

export function getIndexOfTabKey<TabKey extends string>(
  key: TabKey,
  tabKeys: Record<TabKey, TabKey>,
): number {
  return Object.values(tabKeys).indexOf(key)
}

export function getTabKeyForIndex<TabKey extends string>(
  index: number,
  tabKeys: Record<TabKey, TabKey>,
): TabKey {
  const tabKey = Object.keys(tabKeys)[index]

  if (!tabKey) {
    const error = new Error('Invalid tabKey index ' + index)
    console.error(error)
    throw error
  }

  return tabKey as TabKey
}

export function parseTabKeyQueryParam<TabKey extends string>(
  query: ParsedUrlQuery,
  tabKeys: Record<TabKey, TabKey>,
): TabKey {
  const tabKey =
    'tabKey' in query ? normalizeQueryParam<TabKey>(query.tabKey) : null
  if (!isTabKey(tabKey, tabKeys)) {
    const error = new Error(`Invalid [tabKey] query param - ${tabKey}`)
    console.error(error)
    throw error
  }
  return tabKey
}
