import { Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { AuthenticatedPageProps } from '@/layouts/core/types/AuthenticatedPageProps'
import { usePayPeriodEnd } from '@/modules/payroll/usePayPeriodEnd'
import { ArrowRightSm, CalendarIcon } from '@/ui/icons'
import { SmallTitle } from '@/ui/small-title'

const StatWidget = dynamic(() => import('@/ui/StatWidget'))

import { timesheetQueryKeys } from '@/db/api/timesheets/timesheetQueryKeys'
import DashboardStore from '@/modules/dashboard/DashboardStore'
import { useLocalMobXStore } from '@/modules/mobx/LocalStoreProvider'
import { Section } from '@/ui/components/Section'

import { CurrentTimesheetPreview } from './CurrentTimesheetPreview'
import { RouterButton } from './RouterButton'

const OverviewPageCopy = {
  title: 'Home',
  Upcoming: {
    title: 'Upcoming',
    PayPeriod: {
      title: 'Payday',
    },
  },
  LatestActivity: {
    title: 'Latest',
    CurrentTimesheetLink: 'View timesheet',
  },
}

export const OverviewPage = function OverviewPage({
  account,
}: AuthenticatedPageProps) {
  const dashboardStore = useLocalMobXStore<DashboardStore>()
  const payPeriodEnd = usePayPeriodEnd()

  const switchToCurrentTimesheetDetailsTab = () => {
    dashboardStore.setQuery(
      timesheetQueryKeys.detail({
        employee: account.uid,
        payPeriodEnd,
      }),
    )
    dashboardStore.setTabKey('timesheets')
  }

  return (
    <>
      <Section>
        <Section.Top>
          <SmallTitle>{OverviewPageCopy.LatestActivity.title}</SmallTitle>
          <RouterButton onClick={switchToCurrentTimesheetDetailsTab}>
            <Flex>
              {OverviewPageCopy.LatestActivity.CurrentTimesheetLink}
              <ArrowRightSm />
            </Flex>
          </RouterButton>
        </Section.Top>
        <Section.Body>
          <CurrentTimesheetPreview employee={account.uid} />
        </Section.Body>
      </Section>
      <Section>
        <Section.Top>
          <SmallTitle>{OverviewPageCopy.Upcoming.title}</SmallTitle>
        </Section.Top>
        <Section.Body>
          <StatWidget {...getStatWidgetProps(payPeriodEnd)} />
        </Section.Body>
      </Section>
    </>
  )
}

function getStatWidgetProps(payPeriodEnd: string) {
  return {
    name: OverviewPageCopy.Upcoming.PayPeriod.title,
    stat: payPeriodEnd,
    icon: CalendarIcon,
  }
}
