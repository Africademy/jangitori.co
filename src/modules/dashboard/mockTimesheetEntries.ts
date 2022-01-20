import { TimeEntry } from '@/domains/models/TimeEntry'

export const mockTimeEntries: TimeEntry[] = [
  {
    id: 0,
    location: {},
    timestamp: '2021-06-24T21:44:20.572Z',
    timesheet: 5,
  },
  {
    id: 1,
    location: {},
    timestamp: '2021-07-08T17:26:18.578Z',
    timesheet: 5,
  },
  {
    id: 2,
    location: {},
    timestamp: '2021-11-19T13:48:11.111Z',
    timesheet: 5,
  },
  {
    id: 3,
    location: {},
    timestamp: '2021-01-10T21:33:42.490Z',
    timesheet: 5,
  },
  {
    id: 4,
    location: {},
    timestamp: '2021-06-20T18:07:49.781Z',
    timesheet: 5,
  },
]

export const expectedRows = [
  {
    start: '2021-05-22T05:33:46.858Z',
    end: '2021-04-06T22:45:00.436Z',
    totalTime: '--',
  },
  undefined,
  {
    start: '2021-10-16T11:00:27.223Z',
    end: '2021-05-21T21:57:22.146Z',
    totalTime: '--',
  },
  undefined,
  { start: '2021-08-21T22:43:15.546Z', end: '--', totalTime: '--' },
]
