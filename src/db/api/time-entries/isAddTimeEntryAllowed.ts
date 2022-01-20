import differenceInMinutes from 'date-fns/differenceInMinutes'
import parseISO from 'date-fns/parseISO'

import { TimeEntry } from '@/db/models/TimeEntry'

const MIN_TIME_BETWEEN_TIME_ENTRIES = 15

/**
 * Checks if the last time entry for this time card was at least
 * 15 minutes ago.
 */
export function isAddTimeEntryAllowed(entries: TimeEntry[]): boolean {
  if (entries.length <= 1) return true
  const lastEntry = entries.at(-1)!
  const now = new Date()
  const diff = differenceInMinutes(now, parseISO(lastEntry.timestamp))
  return diff >= MIN_TIME_BETWEEN_TIME_ENTRIES
}
