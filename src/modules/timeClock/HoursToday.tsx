import { Box, Flex } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { observer } from 'mobx-react-lite'

import { useCurrentUser } from '@/modules/users/hooks/useCurrentUser'
import { ClockIconSolid } from '@/ui/icons/ClockIcon'

import { InitialTimeClockCopy } from './TimeClockCopy'
import { useTotalHoursToday } from './useTotalHoursToday'

export const HoursToday = observer(function HoursToday() {
  const theme = useTheme()

  const employee = useCurrentUser().uid

  const { hours, error } = useTotalHoursToday(employee)

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
        <Box fontWeight="semibold">{`${
          typeof hours === 'undefined' && typeof error === 'undefined'
            ? '---'
            : `${hours}`
        }`}</Box>
      </Flex>
    </Box>
  )
})
