import { RoleId } from '@/data/models/role'

export const routes = {
  landing: '/' as const,
  auth: '/auth' as const,
  authPage: (view: 'login' | 'signup') => `${routes.auth}/${view}` as const,
  dashboard: `/dashboard` as const,
  dashboardPage: (role: RoleId, subPath: string) =>
    `${routes.dashboard}/${role}/${subPath}` as const,
}

export const authRequiredPaths = [routes.dashboard]

export function isAuthRequiredPathname(pathname: string): boolean {
  return authRequiredPaths.some((authRequiredPath) =>
    pathname.includes(authRequiredPath),
  )
}
