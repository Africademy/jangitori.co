import { mergeErrorMessages } from '@/lib/errors'
import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'
import { useRootStore } from '@/modules/stores'
import { useTimesheetDetails } from '@/modules/timesheets/TimesheetDetailsPage/useTimesheetDetails'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { LoadingVStack } from '@/ui/components/LoadingVStack'

import { DashboardPageProps } from '../DashboardPageProps'
import { PageBody, PageHeading, PageTitle, PageTopActions } from '../Page'
import { SummarySection } from './SummarySection'
import { UpcomingSection } from './UpcomingSection'
import ViewTimesheetButton from './ViewTimesheetButton'

export const OverviewTabPage = ({ account }: DashboardPageProps) => {
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
