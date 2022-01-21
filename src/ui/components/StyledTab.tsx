import { Tab, TabProps } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { HTMLAttributes } from 'react'

const StyledTab = ({
  children,
  isSelected,
  ...props
}: HTMLAttributes<HTMLButtonElement> & { isSelected: boolean }) => {
  const theme = useTheme()
  return (
    <Tab
      borderTop="none"
      borderLeft="none"
      borderRight="none"
      boxShadow="none"
      {...(isSelected
        ? { color: theme.colors.gray[900], fontWeight: 'semibold' }
        : { color: theme.colors.gray[500], fontWeight: 'medium' })}
      _hover={{
        color: theme.colors.gray[700],
        fontWeight: theme.fontWeights.semibold,
        transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)',
      }}
      pb="0.75rem"
      _active={{
        color: theme.colors.gray[900],
      }}
      _focus={{
        boxShadow: 'none',
      }}
      {...props}
    >
      {children}
    </Tab>
  )
}

export default StyledTab
