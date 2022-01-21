import { Box, Button, Container, Flex, VStack } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'

import { Typography } from '@/ui/atoms/Typography'
import { ClockIconSolid } from '@/ui/icons/ClockIcon'

import { DashboardPageProps } from '../DashboardPageProps'
import { InitialTimeClockCopy } from './TimeClockCopy'
import ViewTimesheetButton from './ViewTimesheetButton'

export const OverviewTabPage = ({ account }: DashboardPageProps) => {
  const theme = useTheme()
  return (
    <>
      <MapBackdrop>
        <Overlay>
          <HoursToday />
          <VStack w="100%" position="absolute" bottom={12}>
            <Button colorScheme="blue">
              {InitialTimeClockCopy.StartShift}
            </Button>
            <ViewTimesheetButton />
          </VStack>
        </Overlay>
      </MapBackdrop>
    </>
  )
}

export const Overlay = ({ children }) => {
  return (
    <Container position="absolute" zIndex={50} minW="100%" minH="100%">
      <Flex align="center" justify="space-between" direction="column">
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

export const HoursToday = () => {
  const theme = useTheme()

  return (
    <Box
      shadow={theme.shadows.md}
      borderRadius={theme.radii.lg}
      bg={'#fff'}
      p={3}
      px={5}
      w="70%"
      position="absolute"
      top={0}
    >
      <Flex align="center" justify="space-between" gap={6}>
        <Flex align="center" gap={2}>
          <ClockIconSolid />
          <Typography>{InitialTimeClockCopy.HoursToday}</Typography>
        </Flex>
        <Typography fontWeight="semibold">{'2hr 15min'}</Typography>
      </Flex>
    </Box>
  )
}
