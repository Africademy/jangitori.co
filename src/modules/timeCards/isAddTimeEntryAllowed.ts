import differenceInMinutes from 'date-fns/differenceInMinutes'

import { TimeCard } from '@/common/models/TimeCard'
import { pgTimeToDate } from '@/modules/lib/pgTime'

const MIN_TIME_BETWEEN_TIME_ENTRIES = 15

/**
 * Checks if the last time entry for this time card was at least
 * 15 minutes ago.
 */
export function isAddTimeEntryAllowed(timeCard: TimeCard): boolean {
  if (timeCard.entries.length <= 1) return true
  const lastEntry = timeCard.entries.at(-1)!
  const now = new Date()
  const diff = differenceInMinutes(now, pgTimeToDate(lastEntry.time))
  return diff >= MIN_TIME_BETWEEN_TIME_ENTRIES
}
