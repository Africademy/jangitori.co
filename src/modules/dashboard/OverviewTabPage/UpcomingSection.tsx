import React from 'react'

import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'
import { CalendarIcon } from '@/ui/icons'

import { OverviewTabCopy } from './OverviewTabCopy'
import { PageSection } from './PageSection'
import { Stat } from './Stat'

export interface UpcomingSectionProps {}

export const UpcomingSection: React.FunctionComponent<
  UpcomingSectionProps
> = () => {
  const payPeriodEnd = usePayPeriodEnd()

  return (
    <PageSection
      title={OverviewTabCopy.Upcoming.title}
      body={
        <Stat
          title={OverviewTabCopy.Upcoming.PayPeriod.title}
          data={payPeriodEnd}
          icon={<CalendarIcon />}
        />
      }
    />
  )
}
