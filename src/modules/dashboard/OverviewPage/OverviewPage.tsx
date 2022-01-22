import { Box, Container, Flex, VStack } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { observer } from 'mobx-react-lite'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { useLocationStore } from '@/modules/stores'
import LoadingScreen from '@/ui/components/LoadingScreen'

import { CurrentTimesheetButton } from './CurrentTimesheetButton'
import { HoursToday } from './HoursToday'
import { StartShiftButton } from './StartShiftButton'

export const OverviewPage = observer(function OverviewPage({
  account,
}: AuthenticatedPageProps) {
  const locationStore = useLocationStore()

  if (!locationStore.geolocationPosition) return <LoadingScreen />

  return (
    <>
      <MapBackdrop>
        <Overlay>
          <HoursToday />
          <VStack
            w="100%"
            position="absolute"
            bottom={0}
            pt={8}
            bg={'#fff'}
            shadow="md"
            minH={72}
            flexGrow={1}
            display="flex"
            direction="column"
            px={5}
          >
            <StartShiftButton />
            <CurrentTimesheetButton employee={account.uid} />
          </VStack>
        </Overlay>
      </MapBackdrop>
    </>
  )
})

export const Overlay = ({ children }) => {
  return (
    <Container
      position="absolute"
      zIndex={50}
      minW="100%"
      minH="100%"
      pt={5}
      px={0}
      mx={0}
    >
      <Flex align="center" justify="space-between" direction="column" w="100%">
        {children}
      </Flex>
    </Container>
  )
}

export const MapBackdrop = ({ children }) => {
  const theme = useTheme()
  return (
    <Box
      position="relative"
      bg={theme.colors.green[100]}
      minW="100%"
      minH="100vh"
      p={0}
      m={0}
      zIndex={1}
    >
      {children}
    </Box>
  )
}
