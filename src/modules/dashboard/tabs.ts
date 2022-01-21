import { ParsedUrlQuery } from 'querystring'

import { normalizeQueryParam } from '@/lib/normalizeQueryParam'

import { RoleID } from '../models/Role'

export type BaseTabKey = 'overview' | string

export const isTabKey = <TabKey extends BaseTabKey>(
  o: any,
  tabKeys: string[],
): o is TabKey => {
  return typeof o === 'string' && Object.values(tabKeys).includes(o)
}

export function getIndexOfTabKey<TabKey extends BaseTabKey>(
  key: TabKey,
  tabKeys: TabKey[],
): number {
  return Object.values(tabKeys).indexOf(key)
}

export function getTabKeyForIndex<TabKey extends BaseTabKey>(
  index: number,
  tabKeys: TabKey[],
): TabKey {
  const tabKey = Object.keys(tabKeys)[index]

  if (!tabKey) {
    const error = new Error('Invalid tabKey index ' + index)
    console.error(error)
    throw error
  }

  return tabKey as TabKey
}

export function parseTabKeyQueryParam<TabKey extends BaseTabKey>(
  query: ParsedUrlQuery,
  tabKeys: TabKey[],
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

export function getDashboardTabsForRole(role: RoleID) {
  switch (role) {
    default:
      return ['overview', 'timesheets']
  }
}
