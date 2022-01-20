import millisecondsToMinutes from 'date-fns/millisecondsToMinutes'

import { TimeEntry } from '@/modules/models/TimeEntry'
import { aggregateTimeEntryData } from '@/modules/time-entries/aggregateTimeEntryData'

export type TimesheetDetailsRow = {
  start: string
  end: string
  minutes: string
}

export const buildTimesheetDetailsRows = (
  timeEntries: TimeEntry[],
): TimesheetDetailsRow[] => {
  console.log('RAW:')
  console.table(timeEntries)

  const aggregated = aggregateTimeEntryData(timeEntries)

  console.log('AGGREGATED:')
  console.table(aggregated)

  const rows: TimesheetDetailsRow[] = aggregated.map((data) => ({
    start: new Date(data.start).toISOString(),
    end: data.end ? new Date(data.end).toISOString() : '--',
    minutes:
      data.totalMs >= 0
        ? `${millisecondsToMinutes(data.totalMs)} minutes`
        : '--',
  }))

  return rows
}
