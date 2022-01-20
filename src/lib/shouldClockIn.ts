import { TimeEntry } from '@/modules/models/TimeEntry'

export function shouldClockIn(timeEntries: TimeEntry[]) {
  return Boolean(timeEntries.length % 2 === 0)
}
