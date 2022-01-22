import { observer } from 'mobx-react-lite'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'

import { TimeClockFeature } from './timeClock/TimeClockFeature'

export const OverviewPage = observer(function OverviewPage({
  account,
}: AuthenticatedPageProps) {
  return <TimeClockFeature />
})
