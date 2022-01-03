import { TimeCard, TimeCardEntry } from '@/common/models/TimeCard'
import { toDateString } from '@/common/utils/date-fns'
import { computePayPeriod } from '@/modules/lib/computePayPeriod'

export function buildTimeCardEntry(params: {
  date?: Date
  location?: Record<string, string>
}): TimeCardEntry {
  const { location = {}, date = new Date() } = params
  return { location, time: date.toTimeString() }
}

export interface BuildTimeCardParams {
  employee: string
  date?: Date
}

export function buildTimeCard(
  params: BuildTimeCardParams,
): Omit<TimeCard, 'id'> {
  const { employee, date = new Date() } = params
  const dateStr = toDateString(date)
  const payPeriodEnd = toDateString(computePayPeriod().end)
  const entries: TimeCardEntry[] = [buildTimeCardEntry({ date, location: {} })]
  return {
    employee,
    date: dateStr,
    payPeriodEnd,
    entries,
    createdAt: date.toISOString(),
  }
}
