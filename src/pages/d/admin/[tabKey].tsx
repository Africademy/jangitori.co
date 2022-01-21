import dynamic from 'next/dynamic'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'

const DashboardPage = dynamic(() => import('@/modules/dashboard/DashboardPage'))

import { enforceAuthenticated } from '@/modules/auth/enforceAuthenticated'
import {
  adminDashboardPageProps,
  adminTabKeys,
} from '@/modules/dashboard/AdminDashboardPage'
import { getDashboardLayout } from '@/modules/dashboard/DashboardLayout/getDashboardLayout'
import { DashboardPageProps } from '@/modules/dashboard/DashboardPage'

const AdminDashboardRoute = ({ account }: AuthenticatedPageProps) => {
  const props: DashboardPageProps = { ...adminDashboardPageProps, account }
  return <DashboardPage {...props} />
}

AdminDashboardRoute.getLayout = getDashboardLayout(adminTabKeys)

export default AdminDashboardRoute

/**
 * Every page under /dashboard/[role] should export getServerSideProps,
 * otherwise the AuthenticatedPageProps will be undefined.
 */
export const getServerSideProps = enforceAuthenticated()
