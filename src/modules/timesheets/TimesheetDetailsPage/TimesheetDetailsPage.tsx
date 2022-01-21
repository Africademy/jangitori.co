import { Flex, VStack } from '@chakra-ui/react'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'

import { calendarDateToDate } from '@/lib/date/calendarDate'
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
    { name: '[INSERT_ID]', href: '#', current: true },
  ]

  return (
    <>
      <PageHeading>
        <VStack align="flex-start" py={3} gap={2} w="100%">
          <Breadcrumbs pages={pages} />
          <Flex justify="space-between" pb={3} w="100%">
            <PageTitle>Timesheet</PageTitle>
            <StatusTag status={timesheetData.status} />
          </Flex>
          <Meta leftIcon={CalendarIconSolid} text={`Due ${payPeriodEnd}`} />
          <Meta
            leftIcon={CalculatorIconSolid}
            text={`Total ${computeHoursWorked(timeEntriesData)} hours`}
          />
        </VStack>
        <PageTopActions>
          <NewTimeEntryButton wide {...{ timesheetData, timeEntriesData }} />
        </PageTopActions>
      </PageHeading>
      <PageBody>
        <TimesheetCalendar
          payPeriod={computePayPeriod(calendarDateToDate(payPeriodEnd))}
        />
      </PageBody>
    </>
  )
})

export const HomeIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  )
}

export const ChevronRightIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  )
}

export function Breadcrumbs({
  pages,
}: {
  pages: Array<{ name: string; href: string; current: boolean }>
}) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-3 list-none p-0 m-0">
        {pages.map((page, index) => (
          <li key={page.name} className="list-none p-0 m-0">
            <div className="flex items-center">
              {Boolean(index) && (
                <ChevronRightIcon
                  className="flex-shrink-0 h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              )}
              <a
                href={page.href}
                className={classNames(
                  index && 'ml-3',
                  'text-sm font-medium text-gray-500 hover:text-gray-700',
                )}
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
