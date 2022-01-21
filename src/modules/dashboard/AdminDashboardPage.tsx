import { DashboardPageProps } from './DashboardPage/DashboardPage'
import { initDashboardPage } from './DashboardPage/initDashboardPage'
import OverviewTabPage from './OverviewTabPage'
import { tabLabels } from './tabs'
import TimesheetsTabPage from './TimesheetsTabPage'

const adminDashboardPageProps: Omit<DashboardPageProps, 'account'> = {
  tabs: Object.entries(tabLabels).map(([tabKey, tabLabel]) => ({
    id: tabKey,
    label: tabLabel,
  })),
  tabPanels: [OverviewTabPage, TimesheetsTabPage],
}

const AdminDashboardPage = initDashboardPage(adminDashboardPageProps)

export default AdminDashboardPage
