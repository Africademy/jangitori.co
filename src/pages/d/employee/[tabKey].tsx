import dynamic from 'next/dynamic'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { getDashboardLayout } from '@/modules/dashboard/DashboardLayout/getDashboardLayout'

const EmployeeDashboardPage = dynamic(
  () => import('@/modules/dashboard/EmployeeDashboardPage'),
)

import { enforceAuthenticated } from '@/modules/auth/enforceAuthenticated'

const WithParsedTabKey = dynamic(
  () => import('@/modules/dashboard/WithParsedTabKey'),
)
const EmployeeDashboardRoute = (props: AuthenticatedPageProps) => {
  return (
    <WithParsedTabKey>
      {({ tabKey }) => <EmployeeDashboardPage {...props} tabKey={tabKey} />}
    </WithParsedTabKey>
  )
}

EmployeeDashboardRoute.getLayout = getDashboardLayout

export default EmployeeDashboardRoute

/**
 * Every page under /dashboard/[role] should export getServerSideProps,
 * otherwise the AuthenticatedPageProps will be undefined.
 */
export const getServerSideProps = enforceAuthenticated()
