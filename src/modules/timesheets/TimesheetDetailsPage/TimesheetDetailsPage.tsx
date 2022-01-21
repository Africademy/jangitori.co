import { Flex, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

import {
  prettyCalendarDate,
  prettyCalendarDateWithoutYear,
} from '@/lib/date/calendarDate'
import { mergeErrorMessages } from '@/lib/errors'
import { routes } from '@/lib/routes'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import {
  PageBody,
  PageHeading,
  PageTitle,
  PageTopActions,
} from '@/modules/dashboard/Page'
import { StatusTag } from '@/modules/reviewStatus/StatusTag'
import { useDashboardStore, useRootStore } from '@/modules/stores'
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
import { TimeEntriesTable } from './TimeEntriesTable'

export const TimesheetDetailsPage = observer(function TimesheetDetailsPage({
  query,
}: AuthenticatedPageProps & { query: TimesheetDetailsQuery }) {
  const router = useRouter()

  const { timesheet, timeEntries } = useTimesheetDetails(query)
  const { geolocationStore, authStore } = useRootStore()
  const dashboardStore = useDashboardStore()
  const role = authStore.account?.role
  if (timesheet.error || timeEntries.error || !role) {
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
    {
      name: 'Timesheets',
      href: routes.dashboardPage(role, 'timesheets'),
      current: false,
    },
    {
      name: `${prettyCalendarDate(payPeriodEnd)}`,
      href:
        routes.dashboardPage(role, 'timesheets') +
        `?payPeriodEnd=${query.payPeriodEnd}`,
      current: true,
    },
  ]

  const handleLinkClick = (url: string) => {
    console.log('handleLinkClick - url: ' + url)

    router.push(url)
    dashboardStore.setView('timesheets')
  }

  return (
    <>
      <PageHeading>
        <VStack w="100%" align="start" gap={1}>
          <Breadcrumbs pages={pages} onLinkClick={handleLinkClick} />
          <Flex justify="space-between" w="100%">
            <PageTitle>Timesheet Details</PageTitle>
            <StatusTag status={timesheetData.status} />
          </Flex>
          <VStack w="100%" align="start" gap={0}>
            <Meta
              leftIcon={CalendarIconSolid}
              text={`Due ${prettyCalendarDateWithoutYear(payPeriodEnd)}`}
            />
            <Meta
              leftIcon={CalculatorIconSolid}
              text={`Total ${computeHoursWorked(timeEntriesData)} hours`}
            />
          </VStack>
          <PageTopActions>
            <NewTimeEntryButton {...{ timesheetData, timeEntriesData }} />
          </PageTopActions>
        </VStack>
      </PageHeading>
      <PageBody>
        <TimeEntriesTable data={timeEntriesData} />
      </PageBody>
    </>
  )
})
