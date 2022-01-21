import { DashboardPageProps } from './DashboardPage/DashboardPage'
import { initDashboardPage } from './DashboardPage/initDashboardPage'
import OverviewTabPage from './OverviewTabPage'
import TimesheetsTabPage from './TimesheetsTabPage'

export const EmployeeTabKeys = {
  overview: 'overview',
  timesheets: 'timesheets',
}

export const employeeTabLabels = {
  [EmployeeTabKeys.overview]: 'Overview',
  [EmployeeTabKeys.timesheets]: 'Timesheets',
} as const

export type EmployeeTabKey = 'overview' | 'timesheets'

const employeeDashboardPageProps: Omit<DashboardPageProps, 'account'> = {
  tabs: Object.entries(employeeTabLabels).map(([tabKey, tabLabel]) => ({
    id: tabKey,
    label: tabLabel,
  })),
  tabPanels: [OverviewTabPage, TimesheetsTabPage],
}

const EmployeeDashboardPage = initDashboardPage(employeeDashboardPageProps)

export default EmployeeDashboardPage
