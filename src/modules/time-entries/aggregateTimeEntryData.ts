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
  let newRows: RawData[] = []

  const timestamps = timeEntries.map((entry) => parseISO(entry.timestamp))

  timestamps.forEach((time, index) => {
    if (index % 2 === 0) {
      const start = time
      let end: Date | null = null
      let minutes = 0

      if (index <= timeEntries.length - 1) {
        end = parseISO(timeEntries[index + 1].timestamp)
        minutes = differenceInMinutes(end, start)
      }

      newRows = [...newRows, { start, end, minutes }]
    }
  })

  return newRows
}
