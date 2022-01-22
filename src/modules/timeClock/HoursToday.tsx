import { Box, Flex } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import useSWR from 'swr'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { ClockIconSolid } from '@/ui/icons/ClockIcon'

import { Shift } from '../models/Shift'
import { useRootStore } from '../stores'
import { InitialTimeClockCopy } from './TimeClockCopy'

export function aggregateHours(data: Shift[]): number {
  const totalHours = data.map((shift) => shift.hours).reduce((a, b) => a + b)

  return totalHours
}

export function useTotalHoursToday(employee: string) {
  const { shift: shiftService } = useRootStore().services

  const fetchTotalHoursToday = async () => {
    const shifts = await shiftService.getShifts({
      employee: employee,
      date: new Date().toISOString(),
    })

    return aggregateHours(shifts)
  }

  const { data: hours, ...rest } = useSWR<number, Error>(
    'totalHoursToday',
    fetchTotalHoursToday,
  )

  return { hours, ...rest }
}

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
