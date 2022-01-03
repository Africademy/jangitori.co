import millisecondsToMinutes from 'date-fns/millisecondsToMinutes'

import { TimeCardEntry } from '@/common/models/TimeCard'

import { aggregateTimeEntryData } from './aggregateTimeEntryData'

export function computeMinutesWorked(timeCardEntries: TimeCardEntry[]): number {
  const totalMs = aggregateTimeEntryData(timeCardEntries)
    .map((entry) => entry.totalMs)
    .reduce((total, entry) => total + entry)
  return millisecondsToMinutes(totalMs)
}
