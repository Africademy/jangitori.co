import millisecondsToMinutes from 'date-fns/millisecondsToMinutes'

import { TimeEntry } from '@/domains/models/TimeEntry'

import { aggregateTimeEntryData } from './aggregateTimeEntryData'

export function computeMinutesWorked(timeEntries: TimeEntry[]): number {
  const totalMs = aggregateTimeEntryData(timeEntries)
    .map((entry) => entry.totalMs)
    .reduce((total, entry) => total + entry)
  return millisecondsToMinutes(totalMs)
}
