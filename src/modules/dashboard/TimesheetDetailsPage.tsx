import { Flex, Tag, VStack } from '@chakra-ui/react'
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
import { PayPeriodSelect } from './PayPeriodSelect'
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
        <Flex justify="space-between">
          <PageTitle>Timesheet</PageTitle>
          <Tag colorScheme={TimesheetStatusColor[timesheetData.status]}>
            <Flex display="flex" gap={1.5}>
              <RefreshIconSolid />
              {TimesheetStatusLabel[timesheetData.status]}
            </Flex>
          </Tag>
        </Flex>
        <VStack align="flex-start" py={3} gap={2}>
          <Flex gap={2}>
            <CalendarIconSolid />
            <Typography>Period ends on {timesheetData.payPeriodEnd}</Typography>
          </Flex>
          <Flex gap={2}>
            <CalculatorIconSolid />
            <Typography>Worked {timesheetData.hours} hours</Typography>
          </Flex>
        </VStack>

        <PageTopActions>
          <PayPeriodSelect
            payPeriodEnd={timesheetData.payPeriodEnd}
            onSelect={(newPayPeriodEnd) =>
              console.log('newPayPeriodEnd: ', newPayPeriodEnd)
            }
          />
          <HideForMobile>
            <NewTimeEntryButton {...{ timesheetData, timeEntriesData }} />
          </HideForMobile>
        </PageTopActions>
      </PageHeading>

      <PageBody>
        <TimesheetDetailsTable data={timeEntriesData} />
        <MobileOnly>
          <NewTimeEntryButton {...{ timesheetData, timeEntriesData }} />
        </MobileOnly>
      </PageBody>
    </>
  )
})
