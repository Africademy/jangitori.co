import { useMemo } from 'react'

import { toDateString } from '@/lib/date'
import { computePayPeriod } from '@/modules/payrolls/computePayPeriod'

export function getCurrentPayPeriodEnd(): CalendarDate {
  const dateObj = computePayPeriod().end
  const payPeriodEnd = toDateString(dateObj)
  return payPeriodEnd
}

export function usePayPeriodEnd(): CalendarDate {
  return useMemo(getCurrentPayPeriodEnd, [])
}
