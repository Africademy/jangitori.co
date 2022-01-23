import useSWR, { SWRResponse } from 'swr'

import { TimeEntry } from '@/data/models/timeEntry'
import { Timesheet } from '@/data/models/timesheet'
import { useServices } from '@/modules/stores'
import { timeEntryQueryKeys } from '@/modules/timeClock/timeEntryQueryKeys'

import { TimesheetDetailsQuery } from '../timesheetDetailsQuery'

export function useTimesheetDetails(args: TimesheetDetailsQuery): {
  timesheet: SWRResponse<Timesheet, Error>
  timeEntries: SWRResponse<TimeEntry[], Error>
} {
  const services = useServices()

  const timesheetSWR = useSWR<Timesheet, Error>(
    `/getOrCreateTimesheet?employee=${args.employee}&payPeriodEnd=${args.payPeriodEnd}`,
    async (): Promise<Timesheet> => {
      return await services.timesheet.getOrCreateTimesheet(args)
    },
  )

  const entriesSWR = useSWR<TimeEntry[], Error>(
    timesheetSWR.data ? timeEntryQueryKeys.detail(args) : null,
    async () => {
      // return await services.shift.getShifts(args)
      return await Promise.resolve([])
    },
  )

  return {
    timesheet: timesheetSWR,
    timeEntries: entriesSWR,
  }
}
