import { Tab, TabProps } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'

const StyledTab = ({ children, ...props }: TabProps) => {
  const theme = useTheme()
  return (
    <Tab
      fontWeight="medium"
      _hover={{
        fontWeight: theme.fontWeights.semibold,
        transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)',
      }}
      pb="0.75rem"
      _active={{
        bg: '#dddfe2',
        transform: 'scale(0.98)',
        borderColor: '#bec3c9',
      }}
      _focus={{
        boxShadow:
          '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
      }}
      {...props}
    >
      {children}
    </Tab>
  )
}

export default StyledTab
