import useSWR from 'swr'

import { User } from '@/data/models/user'
import { useTimesheetService } from '@/modules/stores'

export function useTotalHoursForCurrentPayPeriod(employee: User) {
  const timesheetService = useTimesheetService()

  return useSWR<number, Error>('totalHoursForCurrentPayPeriod', () =>
    timesheetService.getTotalHours({
      employee: employee.id,
      payPeriodEnd: new Date().toISOString(),
    }),
  )
}
