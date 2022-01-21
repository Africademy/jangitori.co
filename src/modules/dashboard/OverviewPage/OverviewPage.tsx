import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react'
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
import { Section } from '@/ui/components/Section'
import { largerThan, only } from '@/ui/utils/breakpoints'
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
        <Box
          width="85vw"
          mx="auto"
          css={css`
            ${largerThan('mobile')} {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
          `}
        >
          <Heading
            as="h3"
            size="lg"
            lineHeight={1}
            fontWeight="medium"
          >{`${account.firstName} ${account.lastName}`}</Heading>
          <Box
            css={css`
              ${only('mobile')} {
                padding-top: 1.25rem;
              }
            `}
          >
            <ViewTimesheetButton />
          </Box>
        </Box>
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
  width: 100vw;
  height: 18vh;
  padding: 1.75rem 1.5rem;
  display: flex;
  align-items: center;
  ${({ theme }) =>
    css`
      border-bottom: 0.8px solid ${theme.colors.gray[200]};
    `};
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
  padding-left: 2rem;
  padding-right: 2rem;
  background: transparent;
  font-size: 1rem;

  ${({ theme }) =>
    css`
      font-weight: ${theme.fontWeights.medium};
      color: ${theme.colors.gray[700]};
      border: 0.8px solid ${theme.colors.gray[200]};
      ${pseudo('_hover')} {
        box-shadow: ${theme.shadows.sm};
        border: 0.8px solid ${theme.colors.gray[300]};
        background: transparent;
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
