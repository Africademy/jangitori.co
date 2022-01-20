import millisecondsToMinutes from 'date-fns/millisecondsToMinutes'

import { TimeEntry } from '@/domains/models/TimeEntry'
import { aggregateTimeEntryData } from '@/domains/time-entries/aggregateTimeEntryData'

export type TimesheetDetailsTableRow = {
  start: string
  end: string
  totalTime: string
}

export const buildTimesheetDetailsTableRows = (
  timeEntries: TimeEntry[],
): TimesheetDetailsTableRow[] => {
  console.log('RAW:')
  console.table(timeEntries)

  const aggregated = aggregateTimeEntryData(timeEntries)

  console.log('AGGREGATED:')
  console.table(aggregated)

  const rows: TimesheetDetailsTableRow[] = aggregated.map((data) => ({
    start: new Date(data.start).toISOString(),
    end: data.end ? new Date(data.end).toISOString() : '--',
    totalTime:
      data.totalMs >= 0
        ? `${millisecondsToMinutes(data.totalMs)} minutes`
        : '--',
  }))

  return rows
}
