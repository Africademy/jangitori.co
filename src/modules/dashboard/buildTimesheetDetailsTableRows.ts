import millisecondsToMinutes from 'date-fns/millisecondsToMinutes'

import { TimeEntry } from '@/db/models/TimeEntry'
import { aggregateTimeEntryData } from '@/db/time-entries/aggregateTimeEntryData'

export type TimesheetDetailsTableRow = {
  start: string
  end: string
  totalTime: string
}

export const buildTimesheetDetailsTableRows = (
  entries: TimeEntry[],
): TimesheetDetailsTableRow[] => {
  const rows: TimesheetDetailsTableRow[] = aggregateTimeEntryData(entries).map(
    (data) => ({
      start: new Date(data.start).toISOString(),
      end: data.end ? new Date(data.end).toISOString() : '--',
      totalTime:
        data.totalMs >= 0
          ? `${millisecondsToMinutes(data.totalMs)} minutes`
          : '--',
    }),
  )

  return rows
}
