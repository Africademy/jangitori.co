import { Box, Heading } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

import { useAuthStore } from '@/modules/stores'
import { Row } from '@/ui/atoms/Flex'
import BackButton from '@/ui/molecules/BackButton'
import { spacing } from '@/ui/utils/spacing'

import AccountDropdown, { getAccountDropdownProps } from './AccountDropdown'

const pageNames = {
  timeClock: 'Time Clock',
  timesheets: 'Timesheets',
}
const subPaths = ['timesheets', 'timeClock']

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
        <>
          <Box position="absolute">
            <BackButton />
          </Box>
          <Row justifyContent="center" width="100%">
            <Heading
              size="md"
              fontWeight="medium"
              color="gray.700"
              textAlign="center"
            >
              {pageNames[subPath]}
            </Heading>
          </Row>
        </>
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
