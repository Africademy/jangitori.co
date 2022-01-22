import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'

import { EndShift } from './EndShift'

const TimeClockPage = function TimeClockPage({
  account,
}: AuthenticatedPageProps) {
  return <EndShift />
}

export default TimeClockPage
