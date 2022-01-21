import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'
import { useRootStore } from '@/modules/stores'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { LoadingVStack } from '@/ui/components/LoadingVStack'

import { DashboardPageProps } from '../DashboardPageProps'
import { NewTimeEntryButton } from '../NewTimeEntryButton'
import { PageBody, PageHeading, PageTitle, PageTopActions } from '../Page'
import { mergeErrorMessages } from '../TimesheetDetailsPage'
import { useTimesheetDetails } from '../useTimesheetDetails'
import { SummarySection } from './SummarySection'
import { UpcomingSection } from './UpcomingSection'
import ViewTimesheetButton from './ViewTimesheetButton'

export const OverviewTabPage = function OverviewTabPage({
  account,
}: DashboardPageProps) {
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
