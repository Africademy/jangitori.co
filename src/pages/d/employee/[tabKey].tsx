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

const OverviewTabPage = dynamic(
  () => import('@/modules/dashboard/OverviewTabPage'),
)
const TimesheetsTabPage = dynamic(
  () => import('@/modules/dashboard/TimesheetsTabPage'),
)
const StyledTab = dynamic(() => import('@/modules/dashboard/StyledTab'))

import { observer } from 'mobx-react-lite'

import { NextPageWithLayout } from '@/modules/core/types/NextPagePropsWithLayout'
import { useTabsComponent } from '@/modules/dashboard/useTabsComponent'
import { useDashboardStore } from '@/modules/stores'

const EmployeeDashboardRoute: NextPageWithLayout<AuthenticatedPageProps> =
  observer(function EmployeeDashboardRoute({ account }) {
    const props: DashboardPageProps = { tabs: employeeTabs, account }
    const dashboardStore = useDashboardStore()

    const { getTabsProps, getTabListProps, getTabProps, getTabPanelProps } =
      useTabsComponent()

    return (
      <Tabs
        {...getTabsProps({
          tabIndex: dashboardStore.tabIndex,
          onChange: (index: number) => {
            dashboardStore.routeToTab(employeeTabKeys[index])
          },
        })}
      >
        <TabList {...getTabListProps()}>
          {employeeTabs.map((tab, index) => (
            <StyledTab
              key={tab.id}
              {...getTabProps({
                id: tab.id,
                isSelected: index === dashboardStore.tabIndex,
              })}
            >
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
  })

EmployeeDashboardRoute.getLayout = getDashboardLayout

export default EmployeeDashboardRoute

/**
 * Every page under /dashboard/[role] should export getServerSideProps,
 * otherwise the AuthenticatedPageProps will be undefined.
 */
export const getServerSideProps = enforceAuthenticated()
