import { TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'

const StyledTab = dynamic(() => import('@/ui/components/StyledTab'))

import { useLocalMobXStore } from '@/lib/mobx/LocalStoreProvider'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import DashboardStore from '@/modules/dashboard/DashboardStore'

import { TabButtonProps } from './TabButtonProps'

export type DashboardPageProps = AuthenticatedPageProps<{
  tabs: TabButtonProps[]
  tabPanels: React.ComponentType<DashboardPageProps>[]
}>

export const DashboardPage = observer(function EmployeeDashboardPage(
  props: DashboardPageProps,
) {
  const { tabs, tabPanels } = props
  const theme = useTheme()
  const dashboardStore = useLocalMobXStore<DashboardStore>()

  return (
    <>
      <Tabs
        isLazy
        onChange={dashboardStore.setTab}
        index={dashboardStore.tabIndex}
        colorScheme="gray"
      >
        <TabList
          bg={'#fff'}
          shadow="none"
          px={8}
          borderBottom={`0.8px solid ${theme.colors.gray[300]}`}
        >
          {tabs.map((tab, i) => (
            <StyledTab
              id={tab.id}
              key={tab.id}
              isSelected={dashboardStore.tabIndex === i}
            >
              {tab.label}
            </StyledTab>
          ))}
        </TabList>
        <TabPanels>
          {tabPanels.map((TabPanelComp, i) => (
            <TabPanel key={i} p={0}>
              <TabPanelComp {...props} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  )
})
