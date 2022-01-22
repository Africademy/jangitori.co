import { Box, Flex } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'

import { Typography } from '@/ui/atoms/Typography'
import { ClockIconSolid } from '@/ui/icons/ClockIcon'

import { InitialTimeClockCopy } from './TimeClockCopy'

export const HoursToday = () => {
  const theme = useTheme()

  return (
    <Box
      shadow={theme.shadows.md}
      borderRadius={theme.radii.lg}
      bg={'#fff'}
      p={3}
      w="80%"
    >
      <Flex align="center" justify="space-between" gap={6}>
        <Flex align="center" gap={2}>
          <ClockIconSolid />
          <Box>{InitialTimeClockCopy.HoursToday}</Box>
        </Flex>
        <Box fontWeight="semibold">{'2hr 15min'}</Box>
      </Flex>
    </Box>
  )
}
