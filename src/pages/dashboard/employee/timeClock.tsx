import dynamic from 'next/dynamic'

import { enforceAuthenticated } from '@/modules/auth/enforceAuthenticated'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { NextPageWithLayout } from '@/modules/core/types/NextPagePropsWithLayout'
import { getDashboardLayout } from '@/modules/dashboard/DashboardLayout/getDashboardLayout'

const TimeClockPage = dynamic(() => import('@/modules/timeClock/TimeClockPage'))

const TimeClockRoute: NextPageWithLayout<AuthenticatedPageProps> = TimeClockPage

TimeClockRoute.getLayout = getDashboardLayout

export default TimeClockRoute

/**
 * Every page under /dashboard/[role] should export getServerSideProps,
 * otherwise the AuthenticatedPageProps will be undefined.
 */
export const getServerSideProps = enforceAuthenticated()
