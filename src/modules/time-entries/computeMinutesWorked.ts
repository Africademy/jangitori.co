import millisecondsToMinutes from 'date-fns/millisecondsToMinutes'

import { TimeEntry } from '@/modules/models/TimeEntry'

import { aggregateTimeEntryData } from './aggregateTimeEntryData'

export function computeMinutesWorked(timeEntries: TimeEntry[]): number {
  const minutes = aggregateTimeEntryData(timeEntries)
    .map((entry) => entry.minutes)
    .reduce((total, entry) => total + entry)
  return millisecondsToMinutes(minutes)
}
