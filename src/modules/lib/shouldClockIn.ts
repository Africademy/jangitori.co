import { TimesheetEntry } from '@/common/models/TimesheetEntry'

export function shouldClockIn(entries: TimesheetEntry[]) {
  return Boolean(entries.length % 2 === 0)
}
