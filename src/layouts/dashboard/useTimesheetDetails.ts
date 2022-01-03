import useSWR, { SWRResponse } from 'swr'

import { Timesheet } from '@/common/models/Timesheet'
import { TimesheetEntry } from '@/common/models/TimesheetEntry'
import { useServices } from '@/modules/services'
import { timesheetEntriesApi } from '@/modules/timesheet-entries/timesheetsQueryBuilder'
import { TimesheetDetailsQuery } from '@/modules/timesheets/timesheetsQueryBuilder'
export function useTimesheetDetails(args: TimesheetDetailsQuery[2]): {
  timesheet: SWRResponse<Timesheet, Error>
  entries: SWRResponse<TimesheetEntry[], Error>
} {
  const services = useServices('timesheetEntry', 'timesheet')

  const timesheetSWR = useSWR<Timesheet, Error>(
    `/getOrCreateTimesheet?employee=${args.employee}&payPeriodEnd=${args.payPeriodEnd}`,
    async (): Promise<Timesheet> => {
      return await services.timesheet.getOrCreateTimesheet(args)
    },
  )

  const entriesSWR = useSWR<TimesheetEntry[], Error>(
    timesheetSWR.data ? timesheetEntriesApi.detail(args) : null,
    async () => {
      return await services.timesheetEntry.getTimesheetEntriesByTimesheet(
        timesheetSWR.data!.id,
      )
    },
  )

  return {
    timesheet: timesheetSWR,
    entries: entriesSWR,
  }
}
