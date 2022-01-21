import { Box, Flex, VStack } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'

import { useRootStore } from '@/modules/stores'
import { largerThan, smallerThan } from '@/ui/utils/breakpoints'

import AccountDropdown, { getAccountDropdownProps } from './AccountDropdown'

const LoadingScreen = dynamic(() => import('@/ui/components/LoadingScreen'))

const DashboardLayout = observer(function DashboardLayout({ children }) {
  const { authStore } = useRootStore()

  if (!authStore.account) return <LoadingScreen />

  return (
    <VStack>
      <Flex justify="end" align="center" minW="100vw" py={5} bg="#fff" px={12}>
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
          <AccountDropdown {...getAccountDropdownProps(authStore.account)} />
        </Box>
      </Flex>
      {children}
    </VStack>
  )
})

export default DashboardLayout
