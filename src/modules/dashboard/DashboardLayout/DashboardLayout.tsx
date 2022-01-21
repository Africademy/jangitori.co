import { Box, Container, Flex } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { LocalStoreProvider } from '@/lib/mobx/LocalStoreProvider'
import { useRootStore } from '@/modules/stores'
import { largerThan, smallerThan } from '@/ui/utils/breakpoints'

import AccountDropdown, { getAccountDropdownProps } from './AccountDropdown'

// export function useSyncTabStateWithRoute<TabKey extends string>(
//   getTabKey: () => TabKey,
//   setTabKey: (key: TabKey) => void,
// ) {
//   const router = useRouter()

//   useEffect(() => {
//     const handleRouteChangeComplete = (url: string) => {
//       const tabKey = getTabKey()
//       const newTabKey = url.split('/')[3] as TabKey
//       const shouldSetTab = newTabKey !== tabKey
//       if (shouldSetTab) {
//         setTabKey(newTabKey)
//       }
//     }

//     router.events.on('routeChangeComplete', handleRouteChangeComplete)

//     // If the component is unmounted, unsubscribe
//     // from the event with the `off` method:
//     return () => {
//       router.events.off('routeChangeComplete', handleRouteChangeComplete)
//     }
//   }, [getTabKey, router.events, setTabKey])
// }

export interface DashboardLayoutProps {}

const DashboardLayout = function DashboardLayout({
  children,
}: React.PropsWithChildren<DashboardLayoutProps>) {
  const { dashboardStore } = useRootStore()

  // useSyncTabStateWithRoute(
  //   () => dashboardStore.tabKey,
  //   dashboardStore.setTabKey,
  // )

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
