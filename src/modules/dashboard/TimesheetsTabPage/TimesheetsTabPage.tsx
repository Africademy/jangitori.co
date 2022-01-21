import { useRouter } from 'next/router'

import { useLocalMobXStore } from '@/lib/mobx/LocalStoreProvider'
import { DashboardPageProps } from '@/modules/dashboard/DashboardPageProps'
import DashboardStore from '@/modules/dashboard/DashboardStore'
import TimesheetDetailsPage from '@/modules/timesheets/TimesheetDetailsPage'
import TimesheetsPage from '@/modules/timesheets/TimesheetsPage'

export const TimesheetsTabPage = (props: DashboardPageProps) => {
  const router = useRouter()
  const dashboardStore = useLocalMobXStore<DashboardStore>()

  if (dashboardStore.timesheetDetailsQuery) {
    return (
      <TimesheetDetailsPage
        {...props}
        query={dashboardStore.timesheetDetailsQuery}
      />
    )
  }

  return <TimesheetsPage {...props} />
}
