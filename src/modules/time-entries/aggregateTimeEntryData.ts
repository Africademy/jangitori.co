import differenceInMinutes from 'date-fns/differenceInMinutes'
import parseISO from 'date-fns/parseISO'

import { TimeEntry } from '@/modules/models/TimeEntry'

export interface RawData {
  start: Date
  end: Date | null
  minutes: number
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
      if (index > timeEntries.length - 2) return
      if (index % 2 === 0) {
        const end =
          index < timeEntries.length - 1
            ? parseISO(getNextEntry(index).timestamp)
            : null
        newRows[index] = {
          start: time,
          end,
          minutes: -1,
        }
      } else {
        const { start } = newRows[index - 1]
        const end = time
        const ms = differenceInMinutes(end, start)
        newRows[index - 1] = { start, end, minutes: ms }
      }
    })

  return newRows
}
