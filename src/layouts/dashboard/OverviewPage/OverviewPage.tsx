import { Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { usePayPeriodEnd } from '@/common/hooks/usePayPeriodEnd'
import { AuthenticatedPageProps } from '@/layouts/core/types/AuthenticatedPageProps'
import { ArrowRightSm, CalendarIcon } from '@/ui/icons'
import { SmallTitle } from '@/ui/small-title'

const StatWidget = dynamic(() => import('@/ui/StatWidget'))

import { timesheetQueryKeys } from '@/api/timesheets/timesheetQueryKeys'
import { Section } from '@/common/components/Section'
import DashboardStore from '@/modules/dashboard/DashboardStore'
import { useLocalMobXStore } from '@/modules/mobx/LocalStoreProvider'

import { DashboardHomeCopy } from './constants'
import { CurrentTimesheetPreview } from './CurrentTimesheetPreview'
import { RouterButton } from './RouterButton'

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
          <SmallTitle>{DashboardHomeCopy.LatestActivity.title}</SmallTitle>
          <RouterButton onClick={switchToCurrentTimesheetDetailsTab}>
            <Flex>
              {DashboardHomeCopy.LatestActivity.CurrentTimesheetLink}
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
          <SmallTitle>{DashboardHomeCopy.Upcoming.title}</SmallTitle>
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
    name: DashboardHomeCopy.Upcoming.PayPeriod.title,
    stat: payPeriodEnd,
    icon: CalendarIcon,
  }
}
