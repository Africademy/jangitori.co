import faker from 'faker'
import times from 'lodash.times'

import { Timesheet } from '@/common/models/Timesheet'
import { TimesheetEntry } from '@/common/models/TimesheetEntry'

export const generateTimesheetEntry =
  (timesheet: Timesheet['id']) =>
  (index: number): TimesheetEntry => ({
    id: index,
    location: {},
    timestamp: faker.date.past(1).toISOString(),
    timesheet,
  })

export const generateTimesheetEntries = (timesheet: Timesheet['id'], n = 5) =>
  times(n, generateTimesheetEntry(timesheet))
