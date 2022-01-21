import millisecondsToMinutes from 'date-fns/millisecondsToMinutes'

import { TimeEntry } from '@/modules/models/TimeEntry'
import { buildTimesheetDetailsRows } from '@/modules/timesheets/TimesheetDetailsPage/buildTimesheetDetailsRows'

export function computeMinutesWorked(timeEntries: TimeEntry[]): number {
  const minutes = buildTimesheetDetailsRows(timeEntries)
    .map((entry) => entry.minutes)
    .reduce((total, entry) => total + entry)
  return millisecondsToMinutes(minutes)
}
