import React from 'react'

import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'
import { CalendarIcon } from '@/ui/icons'

import { OverviewPageCopy } from './OverviewPageCopy'
import { PageSection } from './PageSection'
import { Stat } from './Stat'

export interface UpcomingSectionProps {}

export const UpcomingSection: React.FunctionComponent<
  UpcomingSectionProps
> = () => {
  const payPeriodEnd = usePayPeriodEnd()

  return (
    <PageSection
      title={OverviewPageCopy.Upcoming.title}
      body={
        <Stat
          title={OverviewPageCopy.Upcoming.PayPeriod.title}
          data={payPeriodEnd}
          icon={<CalendarIcon />}
        />
      }
    />
  )
}