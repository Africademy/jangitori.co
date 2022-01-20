import faker from 'faker'
import times from 'lodash.times'

import { TimeEntry } from '@/common/models/TimeEntry'
import { Timesheet } from '@/common/models/Timesheet'

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
  it('should list of props needed to render TimesheetDetailsTable given a list of timesheet entries', () => {
    const timesheetId = 0
    const entries: TimeEntry[] = times(10, generateEntry(timesheetId))

    const result = buildTimesheetDetailsTableRows(entries)
    expect(result).toContainAllValues(expectedRows)
  })
})
