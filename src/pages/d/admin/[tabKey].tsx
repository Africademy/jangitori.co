import dynamic from 'next/dynamic'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'

const AdminDashboardPage = dynamic(
  () => import('@/modules/dashboard/AdminDashboardPage'),
)

import { enforceAuthenticated } from '@/modules/auth/enforceAuthenticated'
import { getDashboardLayout } from '@/modules/dashboard/DashboardLayout/getDashboardLayout'

const AdminDashboardRoute = (props: AuthenticatedPageProps) => {
  return <AdminDashboardPage {...props} />
}

AdminDashboardRoute.getLayout = getDashboardLayout

export default AdminDashboardRoute

/**
 * Every page under /dashboard/[role] should export getServerSideProps,
 * otherwise the AuthenticatedPageProps will be undefined.
 */
export const getServerSideProps = enforceAuthenticated()
