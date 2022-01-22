import { Box, Flex } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import useSWR from 'swr'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { ClockIconSolid } from '@/ui/icons/ClockIcon'

import { useAuthStore, useServices } from '../stores'
import { InitialTimeClockCopy } from './TimeClockCopy'

export const HoursToday = () => {
  const theme = useTheme()

  const { shift: shiftService } = useServices()
  const authStore = useAuthStore()
  const employee = authStore.account

  const getTotalHours = async (date: Date = new Date()): Promise<number> => {
    const totalHours = await shiftService.getTotalHoursForDate({
      employee: employee!.uid,
      date: date.toISOString(),
    })
    console.log('👌 GOT TOTAL HOURS: ' + totalHours)
    return totalHours
  }

  const { data: hours, error } = useSWR<number, Error>(
    employee ? 'totalHoursToday' : null,
    getTotalHours,
  )

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
            : hours
        }`}</Box>
      </Flex>
    </Box>
  )
}
