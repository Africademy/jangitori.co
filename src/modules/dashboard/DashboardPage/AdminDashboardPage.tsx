import OverviewTabPage from '../OverviewTabPage'
import { tabLabels } from '../tabs'
import TimesheetsTabPage from '../TimesheetsTabPage'
import { DashboardPageProps } from './DashboardPage'
import { initDashboardPage } from './initDashboardPage'

const adminDashboardPageProps: Omit<DashboardPageProps, 'account'> = {
  tabs: Object.entries(tabLabels).map(([tabKey, tabLabel]) => ({
    id: tabKey,
    label: tabLabel,
  })),
  tabPanels: [OverviewTabPage, TimesheetsTabPage],
}

export const AdminDashboardPage = initDashboardPage(adminDashboardPageProps)
