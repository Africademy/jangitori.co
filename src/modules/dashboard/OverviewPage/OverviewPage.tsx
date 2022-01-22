import { Box, Container, Flex, Skeleton, Stack, VStack } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { observer } from 'mobx-react-lite'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { isProduction } from '@/lib/environment'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { useLocationStore } from '@/modules/stores'

import { CurrentTimesheetButton } from './CurrentTimesheetButton'
import { HoursToday } from './HoursToday'
import { StartShiftButton } from './StartShiftButton'

export const OverviewPage = ({ account }: AuthenticatedPageProps) => {
  return (
    <>
      <MapBackdrop>
        <Overlay>
          <HoursToday />
          <BottomSection>
            <CurrentCoords />
            <TimeClockActions />
          </BottomSection>
        </Overlay>
      </MapBackdrop>
    </>
  )
}

export const BottomSection = ({ children }) => {
  return (
    <Flex
      w="100%"
      position="absolute"
      bottom={0}
      pt={8}
      bg={'#fff'}
      shadow="md"
      minH={72}
      flexGrow={1}
      direction="column"
      px={5}
    >
      {children}
    </Flex>
  )
}

export const CurrentCoords = observer(function CurrentCoords() {
  const locationStore = useLocationStore()

  return (
    <>
      {!isProduction() && locationStore.coords && (
        <p>{`Current location: (${locationStore.coords.latitude}, ${locationStore.coords.longitude})`}</p>
      )}
    </>
  )
})

export const TimeClockActions = observer(function TimeClockActions() {
  const locationStore = useLocationStore()

  const user = useCurrentUser()

  if (locationStore.coords)
    return (
      <>
        <StartShiftButton />
        <CurrentTimesheetButton employee={user.uid} />
      </>
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
