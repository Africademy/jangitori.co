import { RoleID } from '@/modules/models/Role'
import { TimesheetDetailsQuery } from '@/modules/timesheets/timesheetDetailsQuery'

export const routes = {
  landing: '/' as const,
  auth: '/auth' as const,
  authPage: (view: 'login' | 'signup') => `${routes.auth}/${view}` as const,
  dashboard: `/d` as const,
  dashboardPage: <TabKey extends string>(role: RoleID, tab: TabKey) =>
    `${routes.dashboard}/${role}/${tab}` as const,
  timesheetDetailsPage: (role: RoleID, params: TimesheetDetailsQuery) =>
    `${routes.dashboardPage(role, 'timesheets')}?payPeriodEnd=${
      params.payPeriodEnd
    }`,
}

export const authRequiredPaths = [routes.dashboard]

export function isAuthRequiredPathname(pathname: string): boolean {
  return authRequiredPaths.some((authRequiredPath) =>
    pathname.includes(authRequiredPath),
  )
}
