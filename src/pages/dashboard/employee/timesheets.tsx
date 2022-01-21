import dynamic from 'next/dynamic'

import { enforceAuthenticated } from '@/modules/auth/enforceAuthenticated'

const TimesheetsPage = dynamic(
  () => import('@/modules/timesheets/TimesheetsPage'),
)

export default TimesheetsPage

/**
 * Every page under /dashboard/[role] should export getServerSideProps,
 * otherwise the AuthenticatedPageProps will be undefined.
 */
export const getServerSideProps = enforceAuthenticated()
