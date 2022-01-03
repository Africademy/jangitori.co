import differenceInMilliseconds from 'date-fns/differenceInMilliseconds'

import { TimeCardEntry } from '@/common/models/TimeCard'
import { pgTimeToDate } from '@/modules/lib/pgTime'

export interface RawData {
  start: Date
  end: Date | null
  totalMs: number
}

export function aggregateTimeEntryData(
  timeCardEntries: TimeCardEntry[],
): Array<RawData> {
  const newRows: RawData[] = []

  function getNextEntry(index: number): TimeCardEntry {
    const nextEntry = timeCardEntries.at(index + 1)
    if (!nextEntry)
      throw new Error(`failed to get next entry to index ${index}`)
    return nextEntry
  }

  timeCardEntries
    .map((entry) => entry.time)
    .map(pgTimeToDate)
    .forEach((time, index) => {
      if (index % 2 === 0) {
        const end =
          index < timeCardEntries.length - 1
            ? pgTimeToDate(getNextEntry(index).time)
            : null
        newRows[index] = {
          start: time,
          end,
          totalMs: -1,
        }
      } else {
        const { start } = newRows[index - 1]
        const end = time
        const ms = differenceInMilliseconds(end, start)
        newRows[index - 1] = { start, end, totalMs: ms }
      }
    })

  return newRows
}
