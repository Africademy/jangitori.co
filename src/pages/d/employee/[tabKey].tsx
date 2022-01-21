import dynamic from 'next/dynamic'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'

const EmployeeDashboardPage = dynamic(
  () => import('@/modules/dashboard/EmployeeDashboardPage'),
)

import { enforceAuthenticated } from '@/modules/auth/enforceAuthenticated'
import { getDashboardLayout } from '@/modules/dashboard/DashboardLayout/getDashboardLayout'
import { EmployeeTabKeys } from '@/modules/dashboard/EmployeeDashboardPage'

const EmployeeDashboardRoute = (props: AuthenticatedPageProps) => {
  return <EmployeeDashboardPage {...props} />
}

EmployeeDashboardRoute.getLayout = getDashboardLayout(EmployeeTabKeys)

export default EmployeeDashboardRoute

/**
 * Every page under /dashboard/[role] should export getServerSideProps,
 * otherwise the AuthenticatedPageProps will be undefined.
 */
export const getServerSideProps = enforceAuthenticated()
