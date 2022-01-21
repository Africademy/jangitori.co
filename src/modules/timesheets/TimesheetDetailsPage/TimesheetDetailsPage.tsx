import { Flex, Heading, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { mergeErrorMessages } from '@/lib/errors'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import {
  PageBody,
  PageHeading,
  PageTitle,
  PageTopActions,
} from '@/modules/dashboard/Page'
import { StatusTag } from '@/modules/reviewStatus/StatusTag'
import { useRootStore } from '@/modules/stores'
import { NewTimeEntryButton } from '@/modules/timesheets/TimesheetDetailsPage/NewTimeEntryButton'
import { useTimesheetDetails } from '@/modules/timesheets/TimesheetDetailsPage/useTimesheetDetails'
import { TimesheetQuery } from '@/modules/timesheets/timesheetQueryKeys'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { LoadingVStack } from '@/ui/components/LoadingVStack'
import { CalculatorIconSolid } from '@/ui/icons/CalculatorIcon'
import { CalendarIconSolid } from '@/ui/icons/CalendarIcon'
import { Meta } from '@/ui/molecules/Meta'

import { TimesheetDetails } from './TimesheetDetails'

export const TimesheetDetailsPage = observer(function TimesheetDetailsPage({
  query,
}: AuthenticatedPageProps & { query: TimesheetQuery }) {
  const { timesheet, timeEntries } = useTimesheetDetails(query[2])
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

  return (
    <>
      <PageHeading>
        <Flex justify="space-between" pb={3}>
          <PageTitle>Timesheet</PageTitle>
          <StatusTag status={timesheetData.status} />
        </Flex>
        <VStack align="flex-start" py={3} gap={2}>
          <Meta
            leftIcon={CalendarIconSolid}
            text={`Due ${timesheetData.payPeriodEnd}`}
          />
          <Meta
            leftIcon={CalculatorIconSolid}
            text={`Total ${timesheetData.hours} hours`}
          />
        </VStack>
        <PageTopActions>
          <NewTimeEntryButton wide {...{ timesheetData, timeEntriesData }} />
        </PageTopActions>
      </PageHeading>
      <PageBody>
        <Heading as="h5" size="md" textAlign="left" fontWeight="semibold">
          Time Entries
        </Heading>
        <TimesheetDetails data={timeEntriesData} />
      </PageBody>
    </>
  )
})
