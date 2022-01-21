import useSWR from 'swr'

import { DashboardPageProps } from '@/modules/dashboard/DashboardPage'
import { PageBody, PageHeading, PageTitle } from '@/modules/dashboard/Page'
import { Timesheet } from '@/modules/models/Timesheet'
import { useServices } from '@/modules/stores'
import { timesheetQueryKeys } from '@/modules/timesheets/timesheetQueryKeys'
import { ErrorMessage } from '@/ui/components/ErrorMessage'

import TimesheetsTable from './TimesheetsTable'

export const TimesheetsPage = ({ account }: DashboardPageProps) => {
  const services = useServices('timesheet')

  const { data: timesheets, error } = useSWR<Timesheet[], Error>(
    timesheetQueryKeys.list(account.uid),
    async (): Promise<Timesheet[]> => {
      return await services.timesheet.getTimesheetsByEmployee(account.uid)
    },
  )

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>

  return (
    <>
      <PageHeading>
        <PageTitle>Timesheets</PageTitle>
      </PageHeading>
      <PageBody>{timesheets && <TimesheetsTable data={timesheets} />}</PageBody>
    </>
  )
}
