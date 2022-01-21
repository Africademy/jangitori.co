import { DashboardPageProps } from './DashboardPage/DashboardPage'
import { initDashboardPage } from './DashboardPage/initDashboardPage'
import OverviewTabPage from './OverviewTabPage'
import TimesheetsTabPage from './TimesheetsTabPage'

export const AdminTabKeys = {
  overview: 'overview',
  timesheets: 'timesheets',
}

export const adminTabLabels = {
  [AdminTabKeys.overview]: 'Overview',
  [AdminTabKeys.timesheets]: 'Timesheets',
} as const

export type AdminTabKey = 'overview' | 'timesheets'

const adminDashboardPageProps: Omit<DashboardPageProps, 'account'> = {
  tabs: Object.entries(adminTabLabels).map(([tabKey, tabLabel]) => ({
    id: tabKey,
    label: tabLabel,
  })),
  tabPanels: [OverviewTabPage, TimesheetsTabPage],
}

const AdminDashboardPage = initDashboardPage(adminDashboardPageProps)

export default AdminDashboardPage
