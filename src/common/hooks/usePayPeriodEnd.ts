import { useMemo } from 'react'

import { toDateString } from '@/common/utils/date-fns'
import { computePayPeriod } from '@/modules/lib/computePayPeriod'

export function usePayPeriodEnd() {
  return useMemo(() => {
    const dateObj = computePayPeriod().end
    const payPeriodEnd = toDateString(dateObj)
    return payPeriodEnd
  }, [])
}
