import { useMemo } from 'react'

import { toDateString } from '@/modules/lib/date'
import { computePayPeriod } from '@/modules/payroll/computePayPeriod'

export function usePayPeriodEnd() {
  return useMemo(() => {
    const dateObj = computePayPeriod().end
    const payPeriodEnd = toDateString(dateObj)
    return payPeriodEnd
  }, [])
}
