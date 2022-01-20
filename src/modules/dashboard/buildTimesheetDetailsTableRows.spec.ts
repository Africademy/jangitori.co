import parseISO from 'date-fns/parseISO'
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
    const dates = [
      new Date(2000, 1, 1, 1, 0, 0, 0),
      new Date(2000, 1, 1, 3, 0, 0, 0),
      new Date(2000, 1, 1, 5, 0, 0, 0),
      new Date(2000, 1, 1, 7, 0, 0, 0),
    ]

    const timeEntries: TimeEntry[] = dates.map((date) =>
      mockTimeEntryWithInitialData({ timestamp: date.toISOString() }),
    )

    const expectedRows: TimesheetDetailsRow[] = [
      {
        start: dates[0],
        end: dates[1],
        minutes: 120,
      },
      {
        start: dates[2],
        end: dates[3],
        minutes: 120,
      },
    ]

    const result = buildTimesheetDetailsRows(timeEntries)
    expect(result).toHaveLength(2)
    expect(result).toEqual(expectedRows)
  })
})
