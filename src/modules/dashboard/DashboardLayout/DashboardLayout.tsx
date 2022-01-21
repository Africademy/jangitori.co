import { Box, Container, Flex } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from '@/modules/stores'
import { largerThan, smallerThan } from '@/ui/utils/breakpoints'

import AccountDropdown, { getAccountDropdownProps } from './AccountDropdown'

export interface DashboardLayoutProps {}

const DashboardLayout = function DashboardLayout({
  children,
}: React.PropsWithChildren<DashboardLayoutProps>) {
  return (
    <Box maxH="100vh">
      <DashboardHeader />
      <Container maxW="100%" minW="100vw" p={0}>
        {children}
      </Container>
    </Box>
  )
}

export const DashboardHeader = observer(function Header() {
  const { authStore } = useRootStore()

  return (
    <Flex justify="end" align="center" minW="100vw" py={5} bg="#fff" px={6}>
      <Box
        css={css`
          ${largerThan('tablet')} {
            max-width: 80%;
          }
          ${smallerThan('desktop')} {
            max-width: 95%;
          }
        `}
      >
        {authStore.account && (
          <AccountDropdown {...getAccountDropdownProps(authStore.account)} />
        )}
      </Box>
    </Flex>
  )
})

export default DashboardLayout
