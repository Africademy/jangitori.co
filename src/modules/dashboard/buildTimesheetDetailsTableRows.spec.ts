import faker from 'faker'

import { TimeEntry } from '@/modules/models/TimeEntry'

import {
  buildTimesheetDetailsRows,
  TimesheetDetailsRow,
} from './buildTimesheetDetailsRows'

export const mockTimeEntry = (): TimeEntry => ({
  id: faker.datatype.number(),
  location: {},
  timestamp: faker.datatype.datetime().toISOString(),
  timesheet: faker.datatype.number(),
})

const mockTimeEntryWithInitialData = (
  initialData?: Partial<TimeEntry>,
): TimeEntry => ({
  ...mockTimeEntry(),
  ...initialData,
})

/**
 * @group dashboard
 * @group unit
 * @group utils
 * @group modules
 */

describe('buildTimesheetDetailsRows', () => {
  it('should list of props needed to render TimesheetDetailsTable given a list of time timeEntries', () => {
    const timeEntries: TimeEntry[] = [
      mockTimeEntryWithInitialData({
        timestamp: '2022-01-03 01:00:00.000000',
      }),
      mockTimeEntryWithInitialData({
        timestamp: '2022-01-03 03:00:00.000000',
      }),
      mockTimeEntryWithInitialData({
        timestamp: '2022-01-03 05:00:00.000000',
      }),
      mockTimeEntryWithInitialData({
        timestamp: '2022-01-03 07:00:00.000000',
      }),
    ]

    const expectedRows: TimesheetDetailsRow[] = [
      {
        start: '2022-01-03 01:00:00.000000',
        end: '2022-01-03 03:00:00.000000',
        minutes: `120`,
      },
      {
        start: '2022-01-03 05:00:00.000000',
        end: '2022-01-03 07:00:00.000000',
        minutes: `120`,
      },
    ]

    const result = buildTimesheetDetailsRows(timeEntries)
    expect(result).toEqual(expectedRows)
  })
})
