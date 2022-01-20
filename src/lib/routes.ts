import { TabKey } from '@/modules/dashboard/tabs'
import { RoleID } from '@/modules/models/Role'

export const routes = {
  landing: '/' as const,
  auth: '/auth' as const,
  authPage: (view: 'login' | 'signup') => `${routes.auth}/${view}` as const,
  dashboard: `/d` as const,
  dashboardPage: (role: RoleID, tab: TabKey) =>
    `${routes.dashboard}/${role}/${tab}` as const,
}

export const authRequiredPaths = [routes.dashboard]

export function isAuthRequiredPathname(pathname: string): boolean {
  return authRequiredPaths.some((authRequiredPath) =>
    pathname.includes(authRequiredPath),
  )
}
