import useSWR, { SWRResponse } from 'swr'

import { useServices } from '@/app/store'
import { TimeEntry } from '@/domains/models/TimeEntry'
import { Timesheet } from '@/domains/models/Timesheet'
import { timeEntryQueryKeys } from '@/domains/time-entries/timeEntryQueryKeys'
import { TimesheetQuery } from '@/domains/timesheets/timesheetQueryKeys'

export function useTimesheetDetails(args: TimesheetQuery[2]): {
  timesheet: SWRResponse<Timesheet, Error>
  timeEntries: SWRResponse<TimeEntry[], Error>
} {
  const services = useServices('timeEntry', 'timesheet')

  const timesheetSWR = useSWR<Timesheet, Error>(
    `/getOrCreateTimesheet?employee=${args.employee}&payPeriodEnd=${args.payPeriodEnd}`,
    async (): Promise<Timesheet> => {
      return await services.timesheet.getOrCreateTimesheet(args)
    },
  )

  const entriesSWR = useSWR<TimeEntry[], Error>(
    timesheetSWR.data ? timeEntryQueryKeys.detail(args) : null,
    async () => {
      return await services.timeEntry.getTimeEntries(timesheetSWR.data!.id)
    },
  )

  return {
    timesheet: timesheetSWR,
    timeEntries: entriesSWR,
  }
}
