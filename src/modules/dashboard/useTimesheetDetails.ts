import useSWR, { SWRResponse } from 'swr'

import { useServices } from '@/app/store'
import { timeEntryQueryKeys } from '@/db/api/time-entries/timeEntryQueryKeys'
import { TimesheetQuery } from '@/db/api/timesheets/timesheetQueryKeys'
import { TimeEntry } from '@/db/models/TimeEntry'
import { Timesheet } from '@/db/models/Timesheet'

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
