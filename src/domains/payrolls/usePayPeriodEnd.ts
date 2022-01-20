import { useMemo } from 'react'

import { computePayPeriod } from '@/domains/payrolls/computePayPeriod'
import { toDateString } from '@/lib/date'

export function usePayPeriodEnd() {
  return useMemo(() => {
    const dateObj = computePayPeriod().end
    const payPeriodEnd = toDateString(dateObj)
    return payPeriodEnd
  }, [])
}
