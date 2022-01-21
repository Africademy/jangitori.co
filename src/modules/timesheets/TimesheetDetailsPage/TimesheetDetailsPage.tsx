import { Flex, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { calendarDateToDate, prettyCalendarDate } from '@/lib/date/calendarDate'
import { mergeErrorMessages } from '@/lib/errors'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import {
  PageBody,
  PageHeading,
  PageTitle,
  PageTopActions,
} from '@/modules/dashboard/Page'
import { computePayPeriod } from '@/modules/payrolls/computePayPeriod'
import { StatusTag } from '@/modules/reviewStatus/StatusTag'
import { useRootStore } from '@/modules/stores'
import { computeHoursWorked } from '@/modules/time-entries/computeTimeWorked'
import { NewTimeEntryButton } from '@/modules/timesheets/TimesheetDetailsPage/NewTimeEntryButton'
import { useTimesheetDetails } from '@/modules/timesheets/TimesheetDetailsPage/useTimesheetDetails'
import Breadcrumbs from '@/ui/components/Breadcrumbs'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { LoadingVStack } from '@/ui/components/LoadingVStack'
import { CalculatorIconSolid } from '@/ui/icons/CalculatorIcon'
import { CalendarIconSolid } from '@/ui/icons/CalendarIcon'
import { Meta } from '@/ui/molecules/Meta'

import { TimesheetDetailsQuery } from '../timesheetDetailsQuery'
import { TimesheetCalendar } from './TimesheetCalendar'

export const TimesheetDetailsPage = observer(function TimesheetDetailsPage({
  query,
}: AuthenticatedPageProps & { query: TimesheetDetailsQuery }) {
  const { timesheet, timeEntries } = useTimesheetDetails(query)
  const { geolocationStore } = useRootStore()

  if (timesheet.error || timeEntries.error) {
    return (
      <ErrorMessage>
        {mergeErrorMessages(timesheet.error, timeEntries.error)}
      </ErrorMessage>
    )
  }

  const timesheetData = timesheet.data
  const timeEntriesData = timeEntries.data

  if (!timesheetData || !timeEntriesData || !geolocationStore.isReady)
    return <LoadingVStack />

  const { payPeriodEnd } = timesheetData

  const pages = [
    { name: 'Timesheets', href: '#', current: false },
    { name: `${prettyCalendarDate(payPeriodEnd)}`, href: '#', current: true },
  ]

  return (
    <>
      <PageHeading>
        <VStack w="100%" align="start" gap={1}>
          <Breadcrumbs pages={pages} />
          <Flex justify="space-between" w="100%">
            <PageTitle>Timesheet Details</PageTitle>
            <StatusTag status={timesheetData.status} />
          </Flex>
          <VStack w="100%" align="start" gap={1}>
            <Meta leftIcon={CalendarIconSolid} text={`Due ${payPeriodEnd}`} />
            <Meta
              leftIcon={CalculatorIconSolid}
              text={`Total ${computeHoursWorked(timeEntriesData)} hours`}
            />
          </VStack>
          <PageTopActions>
            <NewTimeEntryButton wide {...{ timesheetData, timeEntriesData }} />
          </PageTopActions>
        </VStack>
      </PageHeading>
      <PageBody>
        <TimesheetCalendar
          payPeriod={computePayPeriod(calendarDateToDate(payPeriodEnd))}
        />
      </PageBody>
    </>
  )
})
