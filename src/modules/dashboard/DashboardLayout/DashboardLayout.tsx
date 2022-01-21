import { Box, Container, Flex } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

import { LocalStoreProvider } from '@/lib/mobx/LocalStoreProvider'
import { useMobXStore } from '@/lib/mobx/useMobXStore'
import { RoleIDs } from '@/modules/models/Role'
import { useRootStore } from '@/modules/stores'
import { largerThan, smallerThan } from '@/ui/utils/breakpoints'

import DashboardStore from '../DashboardStore'
import { parseTabKeyQueryParam, TabKey } from '../tabs'
import { useSyncTabStateWithRoute } from '../useSyncTabStateWithRoute'
import AccountDropdown, { getAccountDropdownProps } from './AccountDropdown'

export function useCurrentTabKey() {
  const router = useRouter()

  const tabKey = parseTabKeyQueryParam(router.query)

  return tabKey
}

export function useInitDashboardStore(tabKey: TabKey) {
  const dashboardStore = useMobXStore(
    () =>
      new DashboardStore({
        role: RoleIDs.Employee,
        initialTabKey: tabKey,
      }),
  )

  useSyncTabStateWithRoute(
    () => dashboardStore.tabKey,
    dashboardStore.setTabKey,
  )

  return dashboardStore
}

const DashboardLayout = observer(function DashboardLayout({ children }) {
  const tabKey = useCurrentTabKey()
  const dashboardStore = useInitDashboardStore(tabKey)

  return (
    <LocalStoreProvider localStore={dashboardStore}>
      <Box>
        <DashboardHeader />
        <Container maxW="100%" minW="100vw" p={0}>
          {children}
        </Container>
      </Box>
    </LocalStoreProvider>
  )
})

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
