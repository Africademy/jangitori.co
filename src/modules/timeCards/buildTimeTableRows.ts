import millisecondsToMinutes from 'date-fns/millisecondsToMinutes'

import { TimeCardEntry } from '@/common/models/TimeCard'
import { formatPgTime } from '@/modules/lib/pgTime'

import { aggregateTimeEntryData } from './aggregateTimeEntryData'

export interface TimeTableRow {
  start: string
  end: string | `--`
  totalTime: `${number} minutes` | `--`
}

export function buildTimeTableRows(
  timeCardEntries: TimeCardEntry[],
): TimeTableRow[] {
  const rows: TimeTableRow[] = aggregateTimeEntryData(timeCardEntries).map(
    (data) => ({
      start: formatPgTime(data.start),
      end: data.end ? formatPgTime(data.end) : '--',
      totalTime:
        data.totalMs >= 0
          ? `${millisecondsToMinutes(data.totalMs)} minutes`
          : '--',
    }),
  )

  return rows
}
