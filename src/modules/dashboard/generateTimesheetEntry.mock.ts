import faker from 'faker'
import times from 'lodash.times'

import { TimeEntry } from '@/db/models/TimeEntry'
import { Timesheet } from '@/db/models/Timesheet'

export const generateEntry =
  (timesheet: Timesheet['id']) =>
  (index: number): TimeEntry => ({
    id: index,
    location: {},
    timestamp: faker.date.past(1).toISOString(),
    timesheet,
  })

export const generateTimeEntries = (timesheet: Timesheet['id'], n = 5) =>
  times(n, generateEntry(timesheet))
