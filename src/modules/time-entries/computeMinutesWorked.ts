import millisecondsToMinutes from 'date-fns/millisecondsToMinutes'

import { buildTimesheetDetailsRows } from '@/modules/dashboard/buildTimesheetDetailsRows'
import { TimeEntry } from '@/modules/models/TimeEntry'

export function computeMinutesWorked(timeEntries: TimeEntry[]): number {
  const minutes = buildTimesheetDetailsRows(timeEntries)
    .map((entry) => entry.minutes)
    .reduce((total, entry) => total + entry)
  return millisecondsToMinutes(minutes)
}
