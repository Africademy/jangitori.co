import differenceInMinutes from 'date-fns/differenceInMinutes'
import parseISO from 'date-fns/parseISO'

import { TimeEntry } from '@/data/models/timeEntry'

const MIN_TIME_BETWEEN_TIME_ENTRIES = 15

/**
 * Checks if the last time entry for this time card was at least
 * 15 minutes ago.
 */
export function isAddTimeEntryAllowed(timeEntries: TimeEntry[]): boolean {
  if (!timeEntries.length) return true
  const lastEntry = timeEntries[timeEntries.length - 1]
  const now = new Date()
  const diff = differenceInMinutes(now, parseISO(lastEntry.timestamp))
  return diff >= MIN_TIME_BETWEEN_TIME_ENTRIES
}
