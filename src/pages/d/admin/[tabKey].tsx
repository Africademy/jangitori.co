import { TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { enforceAuthenticated } from '@/modules/auth/enforceAuthenticated'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import {
  AdminTabKey,
  adminTabKeys,
  adminTabs,
} from '@/modules/dashboard/AdminDashboardPage'
import { getDashboardLayout } from '@/modules/dashboard/DashboardLayout/getDashboardLayout'
import { DashboardPageProps } from '@/modules/dashboard/DashboardPageProps'

const OverviewTabPage = dynamic(
  () => import('@/modules/dashboard/OverviewTabPage'),
)
const TimesheetsTabPage = dynamic(
  () => import('@/modules/dashboard/TimesheetsTabPage'),
)
const StyledTab = dynamic(() => import('@/modules/dashboard/StyledTab'))

import DashboardStore from '@/modules/dashboard/DashboardStore'
import { useTabsComponent } from '@/modules/dashboard/useTabsComponent'
import { RoleIDs } from '@/modules/models/Role'

const AdminDashboardRoute = ({ account }: AuthenticatedPageProps) => {
  const props: DashboardPageProps = { tabs: adminTabs, account }

  const { getTabsProps, getTabListProps, getTabProps, getTabPanelProps } =
    useTabsComponent()

  return (
    <Tabs {...getTabsProps()}>
      <TabList {...getTabListProps()}>
        {adminTabs.map((tab, index) => (
          <StyledTab key={tab.id} {...getTabProps({ tab, index })}>
            {tab.label}
          </StyledTab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel {...getTabPanelProps()}>
          <OverviewTabPage {...props} />
        </TabPanel>
        <TabPanel {...getTabPanelProps()}>
          <TimesheetsTabPage {...props} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

AdminDashboardRoute.getLayout = getDashboardLayout(
  () =>
    new DashboardStore<AdminTabKey>({
      tabKeys: adminTabKeys,
      role: RoleIDs.Admin,
    }),
)

export default AdminDashboardRoute

/**
 * Every page under /dashboard/[role] should export getServerSideProps,
 * otherwise the AuthenticatedPageProps will be undefined.
 */
export const getServerSideProps = enforceAuthenticated()
