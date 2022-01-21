import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'

import { DashboardPage, DashboardPageProps } from './DashboardPage'

export const initDashboardPage =
  (baseProps: Omit<DashboardPageProps, 'account'>) =>
  // eslint-disable-next-line react/display-name
  ({ account }: AuthenticatedPageProps) => {
    const props: DashboardPageProps = { ...baseProps, account }
    return <DashboardPage {...props} />
  }
