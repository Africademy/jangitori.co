import { TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { enforceAuthenticated } from '@/modules/auth/enforceAuthenticated'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { getDashboardLayout } from '@/modules/dashboard/DashboardLayout/getDashboardLayout'
import { DashboardPageProps } from '@/modules/dashboard/DashboardPageProps'
import {
  employeeTabKeys,
  employeeTabs,
} from '@/modules/dashboard/EmployeeDashboardPage'
import OverviewTabPage from '@/modules/dashboard/OverviewTabPage'
import TimesheetsTabPage from '@/modules/dashboard/TimesheetsTabPage'
import { useTabsComponent } from '@/modules/dashboard/useTabsComponent'
import StyledTab from '@/ui/components/StyledTab'

const EmployeeDashboardRoute = ({ account }: AuthenticatedPageProps) => {
  const props: DashboardPageProps = { tabs: employeeTabs, account }

  const { getTabsProps, getTabListProps, getTabProps, getTabPanelProps } =
    useTabsComponent()

  return (
    <Tabs {...getTabsProps()}>
      <TabList {...getTabListProps()}>
        {employeeTabs.map((tab, index) => (
          <StyledTab key={tab.id} {...getTabProps(tab, index)}>
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

EmployeeDashboardRoute.getLayout = getDashboardLayout(employeeTabKeys)

export default EmployeeDashboardRoute

/**
 * Every page under /dashboard/[role] should export getServerSideProps,
 * otherwise the AuthenticatedPageProps will be undefined.
 */
export const getServerSideProps = enforceAuthenticated()
