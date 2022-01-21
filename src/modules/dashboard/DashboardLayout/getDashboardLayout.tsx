import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

const DashboardLayout = dynamic(() => import('./DashboardLayout'))

export const getDashboardLayout =
  <TabKey extends string>(tabKeys: Record<TabKey, TabKey>) =>
  // eslint-disable-next-line react/display-name
  (page: ReactElement) => {
    return <DashboardLayout tabKeys={tabKeys}>{page}</DashboardLayout>
  }
