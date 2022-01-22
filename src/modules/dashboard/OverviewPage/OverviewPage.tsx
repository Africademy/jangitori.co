import { Box, Container, Flex, Skeleton, Stack, VStack } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { useLocationStore, useShiftStore } from '@/modules/stores'

import { CurrentTimesheetButton } from './CurrentTimesheetButton'
import { EndShiftButton } from './EndShiftButton'
import { HoursToday } from './HoursToday'
import { StartShiftButton } from './StartShiftButton'

export const OverviewPage = ({ account }: AuthenticatedPageProps) => {
  const shiftStore = useShiftStore()

  useEffect(() => {
    shiftStore.loadCurrentShift()
  }, [shiftStore])

  if (!shiftStore.request.isLoading && !shiftStore.shift)
    return <InitialTimeClockView />

  return <ShiftStartedView />
}

export const InitialTimeClockView = () => {
  return (
    <MapBackdrop>
      <Overlay>
        <HoursToday />
        <BottomSection>
          <TimeClockActions />
        </BottomSection>
      </Overlay>
    </MapBackdrop>
  )
}

export const BottomSection = ({ children }) => {
  return (
    <Box
      w="100%"
      position="absolute"
      bottom={0}
      pt={5}
      bg={'#fff'}
      shadow="md"
      minH={72}
    >
      {children}
    </Box>
  )
}

export const TimeClockActions = observer(function TimeClockActions() {
  const locationStore = useLocationStore()

  const user = useCurrentUser()

  if (locationStore.coords)
    return (
      <VStack w="100%" px={5} gap={3}>
        <StartShiftButton />
        <CurrentTimesheetButton employee={user.uid} />
      </VStack>
    )

  return (
    <Stack>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
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

export const ShiftStartedView = () => {
  return (
    <>
      <HoursToday />
      <VStack w="100%" gap={3}>
        <EndShiftButton />
      </VStack>
    </>
  )
}
