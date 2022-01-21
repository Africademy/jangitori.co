import { useLocalMobXStore } from '@/lib/mobx/LocalStoreProvider'
import { DashboardPageProps } from '@/modules/dashboard/DashboardPageProps'
import DashboardStore from '@/modules/dashboard/DashboardStore'
import TimesheetDetailsPage from '@/modules/timesheets/TimesheetDetailsPage'
import { isTimesheetQuery } from '@/modules/timesheets/timesheetQueryKeys'
import TimesheetsPage from '@/modules/timesheets/TimesheetsPage'

export const TimesheetsTabPage = function TimesheetsTabPage(
  props: DashboardPageProps,
) {
  const dashboardStore = useLocalMobXStore<DashboardStore>()

  if (isTimesheetQuery(dashboardStore.query)) {
    return <TimesheetDetailsPage {...props} query={dashboardStore.query} />
  }

  return <TimesheetsPage {...props} />
}
