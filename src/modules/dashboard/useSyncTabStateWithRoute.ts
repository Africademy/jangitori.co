import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { TabKey } from './tabs'

export function useSyncTabStateWithRoute(
  getTabKey: () => TabKey,
  setTabKey: (key: TabKey) => void,
) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChangeComplete = (url: string) => {
      const tabKey = getTabKey()
      const newTabKey = url.split('/')[3] as TabKey
      const shouldSetTab = newTabKey !== tabKey
      console.log(
        'Current tabIndex ' +
          (!shouldSetTab ? 'SHOULD NOT be set' : 'SHOULD be set'),
      )
      if (shouldSetTab) {
        setTabKey(newTabKey)
      }
    }

    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [getTabKey, setTabKey])
}
