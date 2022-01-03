import faker from 'faker'
import times from 'lodash.times'

import { Timesheet } from '@/common/models/Timesheet'
import { TimesheetEntry } from '@/common/models/TimesheetEntry'

import { buildTimesheetDetailsTableRows } from './buildTimesheetDetailsTableRows'

export const generateTimesheetEntry =
  (timesheet: Timesheet['id']) =>
  (index: number): TimesheetEntry => ({
    id: index,
    location: {},
    timestamp: faker.datatype.datetime().toISOString(),
    timesheet,
  })

describe('buildTimesheetDetailsTableRows', () => {
  it('should list of props needed to render TimesheetDetailsTable given a list of timesheet entries', () => {
    const timesheetId = 0
    const entries: TimesheetEntry[] = times(
      10,
      generateTimesheetEntry(timesheetId),
    )

    const result = buildTimesheetDetailsTableRows(entries)
    expect(result).toContainAllValues(expectedRows)
  })
})
