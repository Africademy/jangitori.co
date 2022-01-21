import { Box, Button, Heading, VStack } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import { useLocalMobXStore } from '@/lib/mobx/LocalStoreProvider'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import DashboardStore from '@/modules/dashboard/DashboardStore'
import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'
import { useRootStore } from '@/modules/stores'
import { timesheetQueryKeys } from '@/modules/timesheets/timesheetQueryKeys'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { LoadingVStack } from '@/ui/components/LoadingVStack'
import { largerThan, only } from '@/ui/utils/breakpoints'
import { pseudo } from '@/ui/utils/pseudo'

import { NewTimeEntryButton } from '../NewTimeEntryButton'
import { mergeErrorMessages } from '../TimesheetDetailsView'
import { useTimesheetDetails } from '../useTimesheetDetails'
import { OverviewPageCopy } from './OverviewPageCopy'
import { SummarySection } from './SummarySection'
import { UpcomingSection } from './UpcomingSection'

export const OverviewPage = function OverviewPage({
  account,
}: AuthenticatedPageProps) {
  const payPeriodEnd = usePayPeriodEnd()

  const { timesheet, timeEntries } = useTimesheetDetails({
    employee: account.uid,
    payPeriodEnd,
  })
  const { geolocationStore } = useRootStore()

  if (timesheet.error || timeEntries.error) {
    return (
      <ErrorMessage>
        {mergeErrorMessages(timesheet.error, timeEntries.error)}
      </ErrorMessage>
    )
  }

  const timesheetData = timesheet.data
  const timeEntriesData = timeEntries.data

  if (!timesheetData || !timeEntriesData || !geolocationStore.isReady)
    return <LoadingVStack />

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
            size="xl"
            lineHeight={1}
            fontWeight="medium"
          >{`${account.firstName} ${account.lastName}`}</Heading>
          <Box
            css={css`
              ${only('mobile')} {
                padding-top: 1.75rem;
                display: flex;
                align-items: center;
                gap: 1rem;
              }
            `}
          >
            <NewTimeEntryButton {...{ timesheetData, timeEntriesData }} />
            <ViewTimesheetButton />
          </Box>
        </Box>
      </PageHeading>
      <PageBody>
        <VStack gap={3}>
          <SummarySection employee={account.uid} />
          <UpcomingSection />
        </VStack>
      </PageBody>
    </>
  )
}

const PageHeading = styled.div`
  background: #fff;
  line-height: none !important;
  width: 100vw;
  height: 21vh;
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
      border: 0.8px solid ${theme.colors.gray[300]};
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
