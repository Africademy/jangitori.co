import { useTheme } from '@emotion/react'

export function useTabsComponent() {
  const theme = useTheme()

  const getTabsProps = (
    props = { tabIndex: 0, onChange: (i) => console.log(i) },
  ) => {
    return {
      isLazy: true,
      colorScheme: 'gray',
      index: props.tabIndex,
      onChange: (index: number) => props.onChange(index),
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

  const getTabProps = (props: { id: string; isSelected: boolean }) => {
    return {
      id: props.id,
      isSelected: props.isSelected,
    }
  }

  const getTabPanelProps = () => {
    return { p: 0 }
  }

  return { getTabsProps, getTabListProps, getTabProps, getTabPanelProps }
}
