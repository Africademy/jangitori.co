import { Box } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { observer } from 'mobx-react-lite'

import { useAuthStore } from '@/modules/stores'
import { StyledFlex } from '@/ui/atoms/Flex'
import { largerThan, smallerThan } from '@/ui/utils/breakpoints'

import AccountDropdown, { getAccountDropdownProps } from './AccountDropdown'

export interface DashboardLayoutProps {}

const DashboardLayout = function DashboardLayout({
  children,
}: React.PropsWithChildren<DashboardLayoutProps>) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  )
}

export const DashboardHeader = observer(function Header() {
  const authStore = useAuthStore()
  return (
    <StyledFlex
      justifyContent="end"
      minWidth="100vw"
      height={14}
      background="#fff"
      px={6}
    >
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
        {authStore.user && (
          <AccountDropdown {...getAccountDropdownProps(authStore.user)} />
        )}
      </Box>
    </StyledFlex>
  )
})

export default DashboardLayout
