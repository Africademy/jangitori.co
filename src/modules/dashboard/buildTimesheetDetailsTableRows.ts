import differenceInMilliseconds from 'date-fns/differenceInMilliseconds'
import millisecondsToMinutes from 'date-fns/millisecondsToMinutes'
import parseISO from 'date-fns/parseISO'

import { TimesheetEntry } from '@/common/models/TimesheetEntry'

export interface RawData {
  start: Date
  end: Date | null
  totalMs: number
}

export function aggregateTimesheetEntryData(
  entries: TimesheetEntry[],
): Array<RawData> {
  const newRows: RawData[] = []

  const getNextEntry = (index: number): TimesheetEntry => {
    if (entries.length <= 1)
      throw new Error('getNextEntry() failed - must have at least 2 entries')

    const nextEntry = entries[index + 1]
    if (!nextEntry)
      throw new Error(`failed to get next entry to index ${index}`)
    return nextEntry
  }

  entries
    .map((entry) => parseISO(entry.timestamp))
    .forEach((time, index) => {
      if (index % 2 === 0) {
        const end =
          index < entries.length - 1
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

export type TimesheetDetailsTableRow = {
  start: string
  end: string
  totalTime: string
}

export const buildTimesheetDetailsTableRows = (
  entries: TimesheetEntry[],
): TimesheetDetailsTableRow[] => {
  const rows: TimesheetDetailsTableRow[] = aggregateTimesheetEntryData(
    entries,
  ).map((data) => ({
    start: new Date(data.start).toISOString(),
    end: data.end ? new Date(data.end).toISOString() : '--',
    totalTime:
      data.totalMs >= 0
        ? `${millisecondsToMinutes(data.totalMs)} minutes`
        : '--',
  }))

  return rows
}
