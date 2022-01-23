import millisecondsToMinutes from 'date-fns/millisecondsToMinutes'

import { TimeEntry } from '@/data/models/timeEntry'
import { buildTimeEntriesRows } from '@/modules/timesheets/TimesheetDetailsPage/buildTimeEntriesRows'

export function computeMinutesWorked(timeEntries: TimeEntry[]): number {
  if (!timeEntries.length) return 0

  const minutes = buildTimeEntriesRows(timeEntries)
    .map((entry) => entry.minutes)
    .reduce((total, entry) => total + entry)
  return millisecondsToMinutes(minutes)
}

export function computeHoursWorked(timeEntries: TimeEntry[]): number {
  const minutes = computeMinutesWorked(timeEntries)

  const hours = parseFloat((minutes / 60).toFixed(2))

  return Number.isNaN(hours) ? 0 : hours
}
