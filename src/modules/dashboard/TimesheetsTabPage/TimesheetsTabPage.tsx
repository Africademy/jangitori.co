import { useLocalMobXStore } from '@/lib/mobx/LocalStoreProvider'
import { DashboardPageProps } from '@/modules/dashboard/DashboardPageProps'
import DashboardStore from '@/modules/dashboard/DashboardStore'
import { isTimesheetQuery } from '@/modules/timesheets/timesheetQueryKeys'

import TimesheetDetailsPage from './TimesheetDetailsPage'
import TimesheetsPage from './TimesheetsPage'

export const TimesheetsTabPage = function TimesheetsTabPage(
  props: DashboardPageProps,
) {
  const dashboardStore = useLocalMobXStore<DashboardStore>()

  if (isTimesheetQuery(dashboardStore.query)) {
    return <TimesheetDetailsPage {...props} query={dashboardStore.query} />
  }

  return <TimesheetsPage {...props} />
}
