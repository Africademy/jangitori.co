import { useTheme } from '@emotion/react'

import { useLocalMobXStore } from '@/lib/mobx/LocalStoreProvider'

import DashboardStore from './DashboardStore'
import { TabButtonProps } from './TabButtonProps'

export function useTabsComponent() {
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

  return { getTabsProps, getTabListProps, getTabProps, getTabPanelProps }
}
