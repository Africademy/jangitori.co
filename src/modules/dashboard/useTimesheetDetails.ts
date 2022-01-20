import useSWR, { SWRResponse } from 'swr'

import { TimeEntry } from '@/common/models/TimeEntry'
import { Timesheet } from '@/common/models/Timesheet'
import { useServices } from '@/modules/services'
import { timeEntryQueryKeys } from '@/modules/time-entries/timeEntryQueryKeys'
import { TimesheetDetailsQuery } from '@/modules/timesheets/timesheetsQueryBuilder'
export function useTimesheetDetails(args: TimesheetDetailsQuery[2]): {
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
