import useSWR, { SWRResponse } from 'swr'

import { Shift } from '@/data/models/shift'
import { User } from '@/data/models/user'
import { useShiftService } from '@/modules/stores'

export function useLatestShift(
  employee: User,
): SWRResponse<Shift | null, Error> {
  const shiftService = useShiftService()
  return useSWR<Shift | null, Error>('latestShift', async () => {
    const { data, error } = await shiftService.findActiveShift({
      employee: employee.id,
    })

    if (error) throw error

    return data
  })
}
