import { TimeEntry } from '@/data/models/timeEntry'

export function shouldClockIn(timeEntries: TimeEntry[]) {
  return Boolean(timeEntries.length % 2 === 0)
}
