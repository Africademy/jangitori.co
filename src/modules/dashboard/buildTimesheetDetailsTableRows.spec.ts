import faker from 'faker'
import times from 'lodash.times'

import { TimeEntry } from '@/db/models/TimeEntry'
import { Timesheet } from '@/db/models/Timesheet'

import { buildTimesheetDetailsTableRows } from './buildTimesheetDetailsTableRows'

export const generateEntry =
  (timesheet: Timesheet['id']) =>
  (index: number): TimeEntry => ({
    id: index,
    location: {},
    timestamp: faker.datatype.datetime().toISOString(),
    timesheet,
  })

describe('buildTimesheetDetailsTableRows', () => {
  it('should list of props needed to render TimesheetDetailsTable given a list of time timeEntries', () => {
    const timesheetId = 0
    const timeEntries: TimeEntry[] = times(10, generateEntry(timesheetId))

    const result = buildTimesheetDetailsTableRows(timeEntries)
    // expect(result).toContainAllValues(expectedRows)
  })
})
