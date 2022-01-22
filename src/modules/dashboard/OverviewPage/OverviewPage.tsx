import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'

import { TimeClockFeature } from './timeClock/TimeClockFeature'

export const OverviewPage = function OverviewPage(
  props: AuthenticatedPageProps,
) {
  return <TimeClockFeature />
}
