import useSWR from 'swr'

import { Shift } from '@/data/models/shift'
import { useRootStore } from '@/modules/stores'

function aggregateHours(data: Shift[]): number {
  return data.map((shift) => shift.hours).reduce((a, b) => a + b)
}

export function useTotalHoursToday(employee: string) {
  const { shift: shiftService } = useRootStore().services

  const fetchTotalHoursToday =
    (args: { employee: string; date: string }) => async () => {
      const shifts = await shiftService.getShifts(args)

      return aggregateHours(shifts)
    }

  const { data: hours, ...rest } = useSWR<number, Error>(
    'totalHoursToday',
    fetchTotalHoursToday({
      employee: employee,
      date: new Date().toISOString(),
    }),
  )

  return { hours, ...rest }
}
