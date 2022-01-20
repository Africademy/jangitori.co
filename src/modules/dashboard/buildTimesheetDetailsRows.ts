import { TimeEntry } from '@/modules/models/TimeEntry'
import { aggregateTimeEntryData } from '@/modules/time-entries/aggregateTimeEntryData'

export type TimesheetDetailsRow = {
  start: Date | string
  end: Date | string | null
  minutes: number
}

export const buildTimesheetDetailsRows = (timeEntries: TimeEntry[]) => {
  console.log('RAW:')
  console.table(timeEntries)

  const aggregated = aggregateTimeEntryData(timeEntries)

  console.log('AGGREGATED:')
  console.table(aggregated)

  return aggregated
}
