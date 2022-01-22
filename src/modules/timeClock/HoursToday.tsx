import { Box, Flex } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { IError } from '@/lib/types/ApiResponse'
import { ClockIconSolid } from '@/ui/icons/ClockIcon'

import { Shift } from '../models/Shift'
import { useRootStore, useServices } from '../stores'
import { InitialTimeClockCopy } from './TimeClockCopy'

export function aggregateHours(data: Shift[]): number {
  const totalHours = data.map((shift) => shift.hours).reduce((a, b) => a + b)

  return totalHours
}

export function useTotalHoursToday(employee: string) {
  const { shift: shiftService } = useRootStore().services

  const [hours, setHours] = useState<number | undefined>(undefined)
  const [error, setError] = useState<IError | undefined | null>(undefined)

  useEffect(() => {
    shiftService
      .getShifts({
        employee: employee,
        date: new Date().toISOString(),
      })
      .then((shifts) => {
        console.log('SHIFTS:', shifts)
        return aggregateHours(shifts)
      })
      .then(setHours)
      .catch(setError)
  }, [employee, shiftService])

  return { hours, error }
}

export const HoursToday = observer(function HoursToday() {
  const theme = useTheme()

  const employee = useCurrentUser().uid

  const { shift: shiftService } = useRootStore().services

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
