import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import {
  isTabKey,
  parseTabKeyQueryParam,
  TabKey,
} from '@/modules/dashboard/tabs'
import LoadingScreen from '@/ui/LoadingScreen'

type WithParsedTabKeyProps = {
  children: (props: { tabKey: TabKey }) => JSX.Element
}

const WithParsedTabKey = ({ children }: WithParsedTabKeyProps) => {
  const router = useRouter()

  const [parsedTabKey, setParsedTabKey] = useState<TabKey | null>(null)

  useEffect(() => {
    setParsedTabKey(parseTabKeyQueryParam(router.query))
  }, [router.query])

  if (!isTabKey(parsedTabKey)) {
    return <LoadingScreen />
  }

  return <>{children({ tabKey: parsedTabKey })}</>
}

export default WithParsedTabKey
