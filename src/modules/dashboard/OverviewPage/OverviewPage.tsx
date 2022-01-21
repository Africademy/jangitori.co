import { Button, VStack } from '@chakra-ui/react'
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
import { pseudo } from '@/ui/utils/pseudo'

import { NewTimeEntryButton } from '../NewTimeEntryButton'
import { PageBody, PageHeading, PageTitle, PageTopActions } from '../Page'
import { mergeErrorMessages } from '../TimesheetDetailsPage'
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
        <PageTitle>{`${account.firstName} ${account.lastName}`}</PageTitle>
        <PageTopActions>
          <NewTimeEntryButton {...{ timesheetData, timeEntriesData }} />
          <ViewTimesheetButton />
        </PageTopActions>
      </PageHeading>
      <PageBody>
        <SummarySection employee={account.uid} />
        <UpcomingSection />
      </PageBody>
    </>
  )
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
