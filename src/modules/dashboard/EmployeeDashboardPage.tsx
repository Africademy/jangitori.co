import { DashboardPageProps } from './DashboardPage/DashboardPage'
import { initDashboardPage } from './DashboardPage/initDashboardPage'
import OverviewTabPage from './OverviewTabPage'
import { tabLabels } from './tabs'
import TimesheetsTabPage from './TimesheetsTabPage'

const employeeDashboardPageProps: Omit<DashboardPageProps, 'account'> = {
  tabs: Object.entries(tabLabels).map(([tabKey, tabLabel]) => ({
    id: tabKey,
    label: tabLabel,
  })),
  tabPanels: [OverviewTabPage, TimesheetsTabPage],
}

const EmployeeDashboardPage = initDashboardPage(employeeDashboardPageProps)

export default EmployeeDashboardPage
