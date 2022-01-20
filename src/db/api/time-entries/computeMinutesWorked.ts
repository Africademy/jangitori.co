import millisecondsToMinutes from 'date-fns/millisecondsToMinutes'

import { TimeEntry } from '@/db/models/TimeEntry'

import { aggregateTimeEntryData } from './aggregateTimeEntryData'

export function computeMinutesWorked(entries: TimeEntry[]): number {
  const totalMs = aggregateTimeEntryData(entries)
    .map((entry) => entry.totalMs)
    .reduce((total, entry) => total + entry)
  return millisecondsToMinutes(totalMs)
}
