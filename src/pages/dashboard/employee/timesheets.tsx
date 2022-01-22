import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { enforceAuthenticated } from '@/modules/auth/enforceAuthenticated'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { NextPageWithLayout } from '@/modules/core/types/NextPagePropsWithLayout'
import { getDashboardLayout } from '@/modules/dashboard/DashboardLayout/getDashboardLayout'
import TimesheetDetailsPage from '@/modules/timesheets/TimesheetDetailsPage'
import { isTimesheetDetailsQuery } from '@/modules/timesheets/timesheetDetailsQuery'

const TimesheetsPage = dynamic(
  () => import('@/modules/timesheets/TimesheetsPage'),
)

const TimesheetsRoute: NextPageWithLayout<AuthenticatedPageProps> = (props) => {
  const router = useRouter()

  if (isTimesheetDetailsQuery(router.query)) {
    return <TimesheetDetailsPage {...props} query={router.query} />
  }
  return <TimesheetsPage {...props} />
}

TimesheetsRoute.getLayout = getDashboardLayout

export default TimesheetsRoute

/**
 * Every page under /dashboard/[role] should export getServerSideProps,
 * otherwise the AuthenticatedPageProps will be undefined.
 */
export const getServerSideProps = enforceAuthenticated()
