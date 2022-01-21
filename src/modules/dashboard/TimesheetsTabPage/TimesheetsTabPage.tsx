import { observer } from 'mobx-react-lite'

import { DashboardPageProps } from '@/modules/dashboard/DashboardPageProps'
import { useDashboardStore } from '@/modules/stores'
import TimesheetDetailsPage from '@/modules/timesheets/TimesheetDetailsPage'
import TimesheetsPage from '@/modules/timesheets/TimesheetsPage'

export const TimesheetsTabPage = observer(function TimesheetsTabPage(
  props: DashboardPageProps,
) {
  const dashboardStore = useDashboardStore()

  if (dashboardStore.timesheetDetailsQuery) {
    return (
      <TimesheetDetailsPage
        {...props}
        query={dashboardStore.timesheetDetailsQuery}
      />
    )
  }

  return <TimesheetsPage {...props} />
})
