import { Box, Flex, VStack } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'

import { largerThan, smallerThan } from '@/common/utils/breakpoints'
import { useRootStore } from '@/modules/stores/useRootStore'

import AccountDropdown, { getAccountDropdownProps } from './AccountDropdown'

const LoadingScreen = dynamic(() => import('@/ui/LoadingScreen'))

const DashboardLayout = observer(function DashboardLayout({ children }) {
  const { authStore } = useRootStore()

  if (!authStore.account) return <LoadingScreen />

  return (
    <VStack>
      <Flex
        justify="end"
        align="center"
        minW="100vw"
        py={3}
        px={8}
        bg="white"
        boxShadow="sm"
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
          <AccountDropdown {...getAccountDropdownProps(authStore.account)} />
        </Box>
      </Flex>
      {children}
    </VStack>
  )
})

export default DashboardLayout
