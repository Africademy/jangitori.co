import { useMemo } from 'react'

import { toDateString } from '@/lib/date'
import { computePayPeriod } from '@/modules/payrolls/computePayPeriod'

export function usePayPeriodEnd() {
  return useMemo(() => {
    const dateObj = computePayPeriod().end
    const payPeriodEnd = toDateString(dateObj)
    return payPeriodEnd
  }, [])
}
