import { Button, Flex, Heading, VStack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'
import { SmallTitle } from '@/ui/atoms/Typography/SmallTitle'
import { CalendarIcon } from '@/ui/icons'

const StatWidget = dynamic(() => import('@/ui/components/StatWidget'))

import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import { useLocalMobXStore } from '@/lib/mobx/LocalStoreProvider'
import DashboardStore from '@/modules/dashboard/DashboardStore'
import { useRootStore } from '@/modules/stores'
import { timesheetQueryKeys } from '@/modules/timesheets/timesheetQueryKeys'
import Typography from '@/ui/atoms/Typography/Typography'
import { Section } from '@/ui/components/Section'
import { only } from '@/ui/utils/breakpoints'
import { pseudo } from '@/ui/utils/pseudo'

import { Avatar } from '../DashboardLayout/AccountDropdown/Avatar'
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
  const theme = useTheme()

  return (
    <>
      <PageHeading>
        <Flex align="center" gap={3}>
          <Avatar
            size="md"
            lineHeight="none"
            bg={theme.colors.gray[400]}
            fontWeight={theme.fontWeights.bold}
            name={`${account.firstName} ${account.lastName}`}
          />
          <VStack align="start" gap={0}>
            <Heading
              as="h3"
              size="lg"
              lineHeight={1}
              fontWeight="medium"
            >{`${account.firstName} ${account.lastName}`}</Heading>
            <Typography
              lineHeight={1}
              textTransform="uppercase"
              fontSize="sm"
              fontWeight="medium"
              color={theme.colors.gray[600]}
            >
              {account.role}
            </Typography>
          </VStack>
        </Flex>
        <ViewTimesheetButton />
      </PageHeading>
      <PageBody>
        <Section>
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
      </PageBody>
    </>
  )
}

const PageHeading = styled.div`
  background: #fff;
  line-height: none !important;
  min-width: 100vwh;
  height: 16vh;
  padding: 1.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${only('mobile')} {
    flex-direction: column;
    justify-content: start;
  }
  gap: 0.75rem;
  ${({ theme }) =>
    css`
      border-bottom: 1px solid ${theme.colors.gray[200]};
    `}
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
  height: 44px;
  max-width: 220px;
  background: transparent;
  font-size: 1rem;

  ${({ theme }) =>
    css`
      font-weight: ${theme.fontWeights.medium};
      color: ${theme.colors.gray[700]};
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
