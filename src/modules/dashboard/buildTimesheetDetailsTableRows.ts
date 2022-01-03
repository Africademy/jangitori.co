import millisecondsToMinutes from 'date-fns/millisecondsToMinutes'

import { TimesheetEntry } from '@/common/models/TimesheetEntry'
import { aggregateTimesheetEntryData } from '@/modules/timesheet-entries/aggregateTimesheetEntryData'

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
