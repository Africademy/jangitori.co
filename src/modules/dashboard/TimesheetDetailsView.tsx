import { Flex, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { useTimesheetDetails } from '@/modules/dashboard/useTimesheetDetails'
import { useRootStore } from '@/modules/stores'
import { TimesheetQuery } from '@/modules/timesheets/timesheetQueryKeys'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { HideForMobile, MobileOnly } from '@/ui/components/HideForMobile'
import { LoadingVStack } from '@/ui/components/LoadingVStack'

import { NewTimeEntryButton } from './NewTimeEntryButton'
import { PayPeriodSelect } from './PayPeriodSelect'
import { TimesheetDetailsTable } from './TimesheetDetailsTable'

export const mergeErrorMessages = (...errors: (Error | Falsy)[]): string => {
  const filteredErrors: Error[] = errors.filter(
    (error) => error instanceof Error,
  ) as Error[]

  const msg = filteredErrors.map((error) => error.message).join('\n')
  return msg
}

export const TimesheetDetailsView = observer(function TimesheetDetailsView({
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
    <VStack minW="100%">
      <Flex align="center" minW="100%" py={2} pb={5} justify="space-between">
        <PayPeriodSelect
          payPeriodEnd={timesheetData.payPeriodEnd}
          onSelect={(newPayPeriodEnd) =>
            console.log('newPayPeriodEnd: ', newPayPeriodEnd)
          }
        />
        <HideForMobile>
          <NewTimeEntryButton {...{ timesheetData, timeEntriesData }} />
        </HideForMobile>
      </Flex>
      <>
        <TimesheetDetailsTable data={timeEntriesData} />
      </>
      <MobileOnly>
        <NewTimeEntryButton {...{ timesheetData, timeEntriesData }} />
      </MobileOnly>
    </VStack>
  )
})
