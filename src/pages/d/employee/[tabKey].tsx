import dynamic from 'next/dynamic'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'

const DashboardPage = dynamic(() => import('@/modules/dashboard/DashboardPage'))

import { enforceAuthenticated } from '@/modules/auth/enforceAuthenticated'
import { getDashboardLayout } from '@/modules/dashboard/DashboardLayout/getDashboardLayout'
import { DashboardPageProps } from '@/modules/dashboard/DashboardPage'
import {
  employeeDashboardPageProps,
  employeeTabKeys,
} from '@/modules/dashboard/EmployeeDashboardPage'

const EmployeeDashboardRoute = ({ account }: AuthenticatedPageProps) => {
  const props: DashboardPageProps = { ...employeeDashboardPageProps, account }
  return <DashboardPage {...props} />
}

EmployeeDashboardRoute.getLayout = getDashboardLayout(employeeTabKeys)

export default EmployeeDashboardRoute

/**
 * Every page under /dashboard/[role] should export getServerSideProps,
 * otherwise the AuthenticatedPageProps will be undefined.
 */
export const getServerSideProps = enforceAuthenticated()
