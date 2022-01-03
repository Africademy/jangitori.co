import { AuthenticatedPageProps } from '@/layouts/core/types/AuthenticatedPageProps'
import DashboardStore from '@/modules/dashboard/DashboardStore'
import { useLocalMobXStore } from '@/modules/mobx/LocalStoreProvider'
import { isTimesheetDetailsQuery } from '@/modules/timesheets/timesheetsQueryBuilder'

import { TimesheetDetailsView } from './TimesheetDetailsView'
import TimesheetsView from './TimesheetsView'

export const TimesheetsTabView = (props: AuthenticatedPageProps) => {
  const dashboardStore = useLocalMobXStore<DashboardStore>()

  if (isTimesheetDetailsQuery(dashboardStore.query)) {
    return <TimesheetDetailsView {...props} query={dashboardStore.query} />
  }

  return <TimesheetsView {...props} />
}
