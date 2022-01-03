import dynamic from 'next/dynamic'

import { AuthenticatedPageProps } from '@/layouts/core/types/AuthenticatedPageProps'

const AdminDashboardPage = dynamic(
  () => import('@/layouts/dashboard/AdminDashboardPage'),
)

import { getDashboardLayout } from '@/layouts/dashboard/DashboardLayout/getDashboardLayout'
import { enforceAuthenticated } from '@/modules/auth/enforceAuthenticated'

const WithParsedTabKey = dynamic(
  () => import('@/layouts/dashboard/WithParsedTabKey'),
)

const AdminDashboardRoute = (props: AuthenticatedPageProps) => {
  return (
    <WithParsedTabKey>
      {({ tabKey }) => <AdminDashboardPage {...props} tabKey={tabKey} />}
    </WithParsedTabKey>
  )
}

AdminDashboardRoute.getLayout = getDashboardLayout

export default AdminDashboardRoute

/**
 * Every page under /dashboard/[role] should export getServerSideProps,
 * otherwise the AuthenticatedPageProps will be undefined.
 */
export const getServerSideProps = enforceAuthenticated()
