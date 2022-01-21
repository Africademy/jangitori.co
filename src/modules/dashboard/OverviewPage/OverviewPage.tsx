import { Button } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'
import { SmallTitle } from '@/ui/atoms/Typography/SmallTitle'
import { CalendarIcon } from '@/ui/icons'

const StatWidget = dynamic(() => import('@/ui/components/StatWidget'))

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import { useLocalMobXStore } from '@/lib/mobx/LocalStoreProvider'
import DashboardStore from '@/modules/dashboard/DashboardStore'
import { useRootStore } from '@/modules/stores'
import { timesheetQueryKeys } from '@/modules/timesheets/timesheetQueryKeys'
import { Section } from '@/ui/components/Section'
import { pseudo } from '@/ui/utils/pseudo'

import { CurrentTimesheetPreview } from './CurrentTimesheetPreview'

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
  const payPeriodEnd = usePayPeriodEnd()

  return (
    <>
      <PageHeading>
        <Section.Top>
          <SmallTitle>{OverviewPageCopy.LatestActivity.title}</SmallTitle>
          <ViewTimesheetButton />
        </Section.Top>
        <Section.Body>
          <CurrentTimesheetPreview employee={account.uid} />
        </Section.Body>
      </PageHeading>
      <PageBody>
        <Section>
          <Section.Top>
            <SmallTitle>{OverviewPageCopy.Upcoming.title}</SmallTitle>
          </Section.Top>
          <Section.Body>
            <StatWidget {...getStatWidgetProps(payPeriodEnd)} />
          </Section.Body>
        </Section>
      </PageBody>
    </>
  )
}

const PageHeading = styled.div`
  background: #fff;
  min-width: 100vwh;
  padding: 3rem 1.5rem;
`

const PageBody = styled.div`
  padding: 1.5rem;
`

function getStatWidgetProps(payPeriodEnd: string) {
  return {
    name: OverviewPageCopy.Upcoming.PayPeriod.title,
    stat: payPeriodEnd,
    icon: CalendarIcon,
  }
}

const SButton = styled(Button)`
  opacity: 0.8;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
  font-size: 1rem;

  ${({ theme }) =>
    css`
      color: ${theme.colors.gray[900]};
      border: 1px solid ${theme.colors.gray[200]};
      ${pseudo('_hover')} {
        box-shadow: ${theme.shadows.sm};
        border: 1px solid ${theme.colors.gray[300]};
        background: transparent;
      }

      svg {
        height: 1.375rem !important;
        width: 1.375rem !important;
      }
    `}
`

const ViewTimesheetButton = observer(function ViewTimesheetButton({}) {
  const { authStore } = useRootStore()
  const employee = authStore.account?.uid
  const dashboardStore = useLocalMobXStore<DashboardStore>()
  const payPeriodEnd = usePayPeriodEnd()

  if (!employee) return null

  const switchToCurrentTimesheetDetailsTab = () => {
    dashboardStore.setQuery(
      timesheetQueryKeys.detail({
        employee,
        payPeriodEnd,
      }),
    )
    dashboardStore.setTabKey('timesheets')
  }

  return (
    <SButton onClick={switchToCurrentTimesheetDetailsTab}>
      {OverviewPageCopy.LatestActivity.CurrentTimesheetLink}
    </SButton>
  )
})
