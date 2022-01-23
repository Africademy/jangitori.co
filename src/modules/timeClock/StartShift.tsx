import { Box, Container, Flex, VStack } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { observer } from 'mobx-react-lite'

import { useLocationStore } from '@/modules/stores'
import LoadingStack from '@/ui/components/LoadingStack'

import { CurrentTimesheetButton } from './CurrentTimesheetButton'
import { HoursToday } from './HoursToday'
import { TimeClockButton } from './TimeClockButton'

export const StartShift = () => {
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

  if (locationStore.coords)
    return (
      <VStack w="100%" px={5} gap={3}>
        <TimeClockButton />
        <CurrentTimesheetButton />
      </VStack>
    )

  return <LoadingStack />
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
