import { Flex, Heading, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { mergeErrorMessages } from '@/lib/errors'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { NewTimeEntryButton } from '@/modules/dashboard/NewTimeEntryButton'
import {
  PageBody,
  PageHeading,
  PageTitle,
  PageTopActions,
} from '@/modules/dashboard/Page'
import { useTimesheetDetails } from '@/modules/dashboard/useTimesheetDetails'
import { ReviewStatus, ReviewStatusColor } from '@/modules/reviewStatus'
import { useRootStore } from '@/modules/stores'
import { TimesheetQuery } from '@/modules/timesheets/timesheetQueryKeys'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { LoadingVStack } from '@/ui/components/LoadingVStack'
import { CalculatorIconSolid } from '@/ui/icons/CalculatorIcon'
import { CalendarIconSolid } from '@/ui/icons/CalendarIcon'
import { RefreshIconSolid } from '@/ui/icons/RefreshIcon'
import { Meta } from '@/ui/molecules/Meta'
import { StatusTag } from '@/ui/molecules/StatusTag'

import { TimesheetDetailsTable } from './TimesheetDetailsTable'

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
          <StatusTag
            leftIcon={RefreshIconSolid}
            colorScheme={ReviewStatusColor[timesheetData.status]}
          >
            {ReviewStatus[timesheetData.status]}
          </StatusTag>
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
          <VStack w="100%" gap={2}>
            <NewTimeEntryButton wide {...{ timesheetData, timeEntriesData }} />
          </VStack>
        </PageTopActions>
      </PageHeading>
      <PageBody>
        <Flex justify="space-between" align="center" w="100%">
          <Heading as="h5" size="md" textAlign="left" fontWeight="semibold">
            Time Entries
          </Heading>
        </Flex>
        <TimesheetDetailsTable data={timeEntriesData} />
      </PageBody>
    </>
  )
})
