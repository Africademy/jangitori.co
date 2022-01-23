import { Box, Heading } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

import { useAuthStore } from '@/modules/stores'
import { Row } from '@/ui/atoms/Flex'
import { spacing } from '@/ui/utils/spacing'

import AccountDropdown, { getAccountDropdownProps } from './AccountDropdown'

export interface DashboardLayoutProps {}

const subPaths = ['timesheets', 'timeClock']

const DashboardLayout = function DashboardLayout({
  children,
}: React.PropsWithChildren<DashboardLayoutProps>) {
  return (
    <div
      css={css`
        min-height: 100%;
      `}
    >
      <DashboardHeader />
      <Box bg={'gray.50'}>{children}</Box>
    </div>
  )
}

const pageNames = {
  timeClock: 'Time Clock',
  timesheets: 'Timesheets',
}

export const DashboardHeader = observer(function Header() {
  const authStore = useAuthStore()
  const router = useRouter()
  const subPath = router.asPath.split('/')[3]
  const isSubPath = subPaths.includes(subPath)

  return (
    <Row
      position="relative"
      justifyContent="space-between"
      minWidth="100vw"
      height={14}
      background="#fff"
      px={6}
    >
      {isSubPath && (
        <Heading size="md" fontWeight="medium" color="gray.700">
          {pageNames[subPath]}
        </Heading>
      )}
      <div
        css={css`
          position: absolute;
          right: ${spacing(5)};
        `}
      >
        {authStore.user && (
          <AccountDropdown {...getAccountDropdownProps(authStore.user)} />
        )}
      </div>
    </Row>
  )
})

export default DashboardLayout
