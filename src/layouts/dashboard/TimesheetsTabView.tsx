import { AuthenticatedPageProps } from '@/layouts/core/types/AuthenticatedPageProps'
import { useLocalMobXStore } from '@/lib/mobx/LocalStoreProvider'
import DashboardStore from '@/modules/dashboard/DashboardStore'
import { isTimesheetQuery } from '@/modules/timesheets/timesheetQueryKeys'

import { TimesheetDetailsView } from './TimesheetDetailsView'
import TimesheetsView from './TimesheetsView'

export const TimesheetsTabView = (props: AuthenticatedPageProps) => {
  const dashboardStore = useLocalMobXStore<DashboardStore>()

  if (isTimesheetQuery(dashboardStore.query)) {
    return <TimesheetDetailsView {...props} query={dashboardStore.query} />
  }

  return <TimesheetsView {...props} />
}
