import { useTheme } from '@emotion/react'

import { useLocalMobXStore } from '@/lib/mobx/LocalStoreProvider'

import DashboardStore from './DashboardStore'
import { TabButtonProps } from './TabButtonProps'

export function useTabsComponent() {
  const theme = useTheme()
  const dashboardStore = useLocalMobXStore<DashboardStore>()

  const getTabsProps = (props = {}) => {
    return {
      isLazy: true,
      colorScheme: 'gray',
      index: dashboardStore.tabIndex,
      onChange: (index: number) => {
        dashboardStore.setTab(index)
        dashboardStore.clearQueries()
      },
      ...props,
    }
  }

  const getTabListProps = (props = {}) => {
    return {
      bg: '#fff',
      shadow: 'none',
      px: 8,
      borderBottom: `0.8px solid ${theme.colors.gray[300]}`,
      ...props,
    }
  }

  const getTabProps = (props: { tab: TabButtonProps; index: number }) => {
    return {
      id: props.tab.id,
      isSelected: dashboardStore.tabIndex === props.index,
    }
  }

  const getTabPanelProps = () => {
    return { p: 0 }
  }

  return { getTabsProps, getTabListProps, getTabProps, getTabPanelProps }
}
