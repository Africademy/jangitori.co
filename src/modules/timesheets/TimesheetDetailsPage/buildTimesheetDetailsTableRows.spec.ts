import faker from 'faker'

import { TimeEntry } from '@/modules/models/TimeEntry'

import {
  buildTimeEntriesRows,
  TimesheetDetailsRow,
} from './buildTimeEntriesRows'

export const mockTimeEntry = (): TimeEntry => ({
  id: faker.datatype.number(),
  location: {
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
  },
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

describe('buildTimeEntriesRows', () => {
  it('should list of props needed to render TimesheetDetails given a list of time timeEntries', () => {
    const dates = [
      new Date(2000, 0, 0, 1, 0, 0, 0),
      new Date(2000, 0, 0, 3, 0, 0, 0),
      new Date(2000, 0, 0, 5, 0, 0, 0),
      new Date(2000, 0, 0, 7, 0, 0, 0),
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

    const result = buildTimeEntriesRows(timeEntries)
    expect(result).toHaveLength(2)
    expect(result).toEqual(expectedRows)
  })
})
