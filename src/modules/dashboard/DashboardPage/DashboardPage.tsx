import { TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'

const StyledTab = dynamic(() => import('@/ui/components/StyledTab'))

import { useLocalMobXStore } from '@/lib/mobx/LocalStoreProvider'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import DashboardStore from '@/modules/dashboard/DashboardStore'

import OverviewTabPage from '../OverviewTabPage'
import TimesheetsTabPage from '../TimesheetsTabPage'
import { TabButtonProps } from './TabButtonProps'

export type DashboardPageProps = AuthenticatedPageProps<{
  tabs: TabButtonProps[]
}>

export const DashboardPage = observer(function DashboardPage(
  props: DashboardPageProps,
) {
  const { tabs } = props
  const theme = useTheme()
  const dashboardStore = useLocalMobXStore<DashboardStore>()

  const getTabsProps = () => {
    return {
      isLazy: true,
      colorScheme: 'gray',
      index: dashboardStore.tabIndex,
      onChange: dashboardStore.setTab,
    }
  }

  const getTabListProps = () => {
    return {
      bg: '#fff',
      shadow: 'none',
      px: 8,
      borderBottom: `0.8px solid ${theme.colors.gray[300]}`,
    }
  }

  const getTabProps = (tab: TabButtonProps, index: number) => {
    return {
      id: tab.id,
      isSelected: dashboardStore.tabIndex === index,
    }
  }

  const getTabPanelProps = () => {
    return { p: 0 }
  }

  return (
    <>
      <Tabs {...getTabsProps()}>
        <TabList {...getTabListProps()}>
          {tabs.map((tab, index) => (
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
    </>
  )
})
