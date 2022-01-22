import { Box, Flex } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import useSWR from 'swr'

import { ClockIconSolid } from '@/ui/icons/ClockIcon'

import { useServices } from '../stores'
import { InitialTimeClockCopy } from './TimeClockCopy'

export function useGetTotalHoursForDate() {
  const { shift: shiftService } = useServices()

  async function getTotalHours(date: Date = new Date()): Promise<number> {
    const totalHours = await shiftService.getTotalHoursForDate(date)
    console.log('👌 GOT TOTAL HOURS: ' + totalHours)
    return totalHours
  }

  return getTotalHours
}

export const HoursToday = () => {
  const theme = useTheme()

  const getTotalHours = useGetTotalHoursForDate()

  const { data: hours } = useSWR<number, Error>(
    'totalHoursToday',
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
          typeof hours === 'undefined' ? '---' : hours
        }`}</Box>
      </Flex>
    </Box>
  )
}
