import { useRouter } from 'next/router'

import { parseTabKeyQueryParam } from './tabs'

export function useCurrentTabKey<TabKey extends string>(tabKeys: TabKey[]) {
  const router = useRouter()

  const tabKey = parseTabKeyQueryParam<TabKey>(router.query, tabKeys)

  return tabKey
}
