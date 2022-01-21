import { DashboardPageProps } from './DashboardPage/DashboardPage'
import DashboardStore from './DashboardStore'

export enum AdminTabKey {
  OVERVIEW = 'overview',
  TIMESHEETS = 'timesheets',
}

export const adminTabKeys = [AdminTabKey.OVERVIEW, AdminTabKey.TIMESHEETS]

export const adminTabLabels = {
  [AdminTabKey.OVERVIEW]: 'Overview',
  [AdminTabKey.TIMESHEETS]: 'Timesheets',
} as const

export const adminDashboardPageProps: Omit<DashboardPageProps, 'account'> = {
  tabs: Object.entries(adminTabLabels).map(([tabKey, tabLabel]) => ({
    id: tabKey,
    label: tabLabel,
  })),
}

export class AdminDashboardStore extends DashboardStore<AdminTabKey> {}
