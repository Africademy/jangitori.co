import useSWR, { SWRResponse } from 'swr'

import { TimeEntry } from '@/db/models/TimeEntry'
import { Timesheet } from '@/db/models/Timesheet'
import { timeEntryQueryKeys } from '@/db/time-entries/timeEntryQueryKeys'
import { TimesheetQuery } from '@/db/timesheets/timesheetQueryKeys'
import { useServices } from '@/modules/services'
export function useTimesheetDetails(args: TimesheetQuery[2]): {
  timesheet: SWRResponse<Timesheet, Error>
  entries: SWRResponse<TimeEntry[], Error>
} {
  const services = useServices('TimeEntry', 'timesheet')

  const timesheetSWR = useSWR<Timesheet, Error>(
    `/getOrCreateTimesheet?employee=${args.employee}&payPeriodEnd=${args.payPeriodEnd}`,
    async (): Promise<Timesheet> => {
      return await services.timesheet.getOrCreateTimesheet(args)
    },
  )

  const entriesSWR = useSWR<TimeEntry[], Error>(
    timesheetSWR.data ? timeEntryQueryKeys.detail(args) : null,
    async () => {
      return await services.TimeEntry.getTimeEntries(timesheetSWR.data!.id)
    },
  )

  return {
    timesheet: timesheetSWR,
    entries: entriesSWR,
  }
}
