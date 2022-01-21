import { RoleID } from '@/modules/models/Role'

export const routes = {
  landing: '/' as const,
  auth: '/auth' as const,
  authPage: (view: 'login' | 'signup') => `${routes.auth}/${view}` as const,
  dashboard: `/dashboard` as const,
  dashboardTab: <TabKey extends string>(role: RoleID, tab: TabKey) =>
    `${routes.dashboard}/${role}/${tab}` as const,
  dashboardActual: (role: RoleID, subPath: string) =>
    `${routes.dashboard}/${role}/${subPath}` as const,
  dashboardPresented: (subPath: string) =>
    `${routes.dashboard}/${subPath}` as const,
}

export const authRequiredPaths = [routes.dashboard]

export function isAuthRequiredPathname(pathname: string): boolean {
  return authRequiredPaths.some((authRequiredPath) =>
    pathname.includes(authRequiredPath),
  )
}
