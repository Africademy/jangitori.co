import { useLocalMobXStore } from '@/lib/mobx/LocalStoreProvider'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import DashboardStore from '@/modules/dashboard/DashboardStore'
import { isTimesheetQuery } from '@/modules/timesheets/timesheetQueryKeys'

import { TimesheetDetailsPage } from './TimesheetDetailsPage'
import TimesheetsView from './TimesheetsView'

export const TimesheetsTabView = (props: AuthenticatedPageProps) => {
  const dashboardStore = useLocalMobXStore<DashboardStore>()

  if (isTimesheetQuery(dashboardStore.query)) {
    return <TimesheetDetailsPage {...props} query={dashboardStore.query} />
  }

  return <TimesheetsView {...props} />
}
