import differenceInMilliseconds from 'date-fns/differenceInMilliseconds'
import parseISO from 'date-fns/parseISO'

import { TimeEntry } from '@/db/models/TimeEntry'

export interface RawData {
  start: Date
  end: Date | null
  totalMs: number
}

export function aggregateTimeEntryData(
  timeEntries: TimeEntry[],
): Array<RawData> {
  const newRows: RawData[] = []

  const getNextEntry = (index: number): TimeEntry => {
    if (timeEntries.length <= 1)
      throw new Error(
        'getNextEntry() failed - must have at least 2 timeEntries',
      )

    const nextEntry = timeEntries[index + 1]
    if (!nextEntry)
      throw new Error(`failed to get next entry to index ${index}`)
    return nextEntry
  }

  timeEntries
    .map((entry) => parseISO(entry.timestamp))
    .forEach((time, index) => {
      if (index % 2 === 0) {
        const end =
          index < timeEntries.length - 1
            ? parseISO(getNextEntry(index).timestamp)
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
