import { Button, Flex, Heading, Tag, VStack } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { observer } from 'mobx-react-lite'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { useTimesheetDetails } from '@/modules/dashboard/useTimesheetDetails'
import { useRootStore } from '@/modules/stores'
import { TimesheetQuery } from '@/modules/timesheets/timesheetQueryKeys'
import Typography from '@/ui/atoms/Typography/Typography'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { HideForMobile, MobileOnly } from '@/ui/components/HideForMobile'
import { LoadingVStack } from '@/ui/components/LoadingVStack'
import { CalendarIconSolid } from '@/ui/icons'
import { CalculatorIconSolid } from '@/ui/icons/CalculatorIcon'
import { RefreshIconSolid } from '@/ui/icons/RefreshIcon'

import {
  TimesheetStatusColor,
  TimesheetStatusLabel,
} from '../timesheets/TimesheetStatus'
import { NewTimeEntryButton } from './NewTimeEntryButton'
import { PageBody, PageHeading, PageTitle, PageTopActions } from './Page'
import { TimesheetDetailsTable } from './TimesheetDetailsTable'

export const mergeErrorMessages = (...errors: (Error | Falsy)[]): string => {
  const filteredErrors: Error[] = errors.filter(
    (error) => error instanceof Error,
  ) as Error[]

  const msg = filteredErrors.map((error) => error.message).join('\n')
  return msg
}

export const TimesheetDetailsPage = observer(function TimesheetDetailsPage({
  query,
}: AuthenticatedPageProps & { query: TimesheetQuery }) {
  const theme = useTheme()
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
          <Tag colorScheme={TimesheetStatusColor[timesheetData.status]}>
            <Flex display="flex" gap={1.5}>
              <RefreshIconSolid />
              {TimesheetStatusLabel[timesheetData.status]}
            </Flex>
          </Tag>
        </Flex>
        <VStack align="flex-start" py={3} gap={2}>
          <Flex gap={2} align="center">
            <CalendarIconSolid />
            <Typography lineHeight={1}>
              Due on {timesheetData.payPeriodEnd}
            </Typography>
          </Flex>
          <Flex gap={2} align="center">
            <CalculatorIconSolid />
            <Typography lineHeight={1}>
              Worked {timesheetData.hours} hours
            </Typography>
          </Flex>
        </VStack>
        <PageTopActions>
          <Button
            color={'#fff'}
            bg={theme.colors.indigo[600]}
            disabled={timesheetData.status !== 'in-progress'}
          >
            Request to Edit
          </Button>
          <HideForMobile>
            <NewTimeEntryButton {...{ timesheetData, timeEntriesData }} />
          </HideForMobile>
        </PageTopActions>
      </PageHeading>

      <PageBody>
        <Flex justify="start" w="100%">
          <Heading as="h5" size="md" textAlign="left" fontWeight="semibold">
            Time Entries
          </Heading>
        </Flex>
        <TimesheetDetailsTable data={timeEntriesData} />
        <MobileOnly>
          <NewTimeEntryButton {...{ timesheetData, timeEntriesData }} />
        </MobileOnly>
      </PageBody>
    </>
  )
})
