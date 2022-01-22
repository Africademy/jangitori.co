import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'

import { TimeClockFeature } from './TimeClockFeature'

const TimeClockPage = function TimeClockPage({
  account,
}: AuthenticatedPageProps) {
  return <TimeClockFeature />
}

export default TimeClockPage
