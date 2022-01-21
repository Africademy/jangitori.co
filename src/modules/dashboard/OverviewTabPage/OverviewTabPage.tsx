import { DashboardPageProps } from '../DashboardPageProps'
import { PageBody, PageHeading, PageTitle, PageTopActions } from '../Page'
import { SummarySection } from './SummarySection'
import { UpcomingSection } from './UpcomingSection'
import ViewTimesheetButton from './ViewTimesheetButton'

export const OverviewTabPage = ({ account }: DashboardPageProps) => {
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
