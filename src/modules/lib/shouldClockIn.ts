import { TimeEntry } from '@/common/models/TimeEntry'

export function shouldClockIn(entries: TimeEntry[]) {
  return Boolean(entries.length % 2 === 0)
}
