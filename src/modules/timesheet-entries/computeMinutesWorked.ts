import millisecondsToMinutes from 'date-fns/millisecondsToMinutes'

import { TimesheetEntry } from '@/common/models/TimesheetEntry'

import { aggregateTimesheetEntryData } from './aggregateTimesheetEntryData'

export function computeMinutesWorked(entries: TimesheetEntry[]): number {
  const totalMs = aggregateTimesheetEntryData(entries)
    .map((entry) => entry.totalMs)
    .reduce((total, entry) => total + entry)
  return millisecondsToMinutes(totalMs)
}
