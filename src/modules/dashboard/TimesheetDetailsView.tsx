import { Flex, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { shouldClockIn } from '@/lib/shouldClockIn'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { useTimesheetDetails } from '@/modules/dashboard/useTimesheetDetails'
import { Timesheet } from '@/modules/models/Timesheet'
import { useRootStore, useServices } from '@/modules/stores'
import { isAddTimeEntryAllowed } from '@/modules/time-entries/isAddTimeEntryAllowed'
import { TimesheetQuery } from '@/modules/timesheets/timesheetQueryKeys'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
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
  const services = useServices('timeEntry', 'timesheet')
  const { timesheet, timeEntries } = useTimesheetDetails(query[2])
  const { geolocationStore } = useRootStore()

  if (timesheet.error || timeEntries.error) {
    return (
      <ErrorMessage>
        {mergeErrorMessages(timesheet.error, timeEntries.error)}
      </ErrorMessage>
    )
  }

  if (!timesheet.data || !timeEntries.data || !geolocationStore.isReady)
    return <LoadingVStack />

  const isClockIn = shouldClockIn(timeEntries.data)
  const timesheetId = timesheet.data ? timesheet.data.id : null

  return (
    <VStack minW="100%">
      <Flex align="center" minW="100%" py={2} pb={5} justify="space-between">
        <PayPeriodSelect
          payPeriodEnd={query[2].payPeriodEnd}
          onSelect={(newPayPeriodEnd) =>
            console.log('newPayPeriodEnd: ', newPayPeriodEnd)
          }
        />
        {timesheetId !== null && (
          <NewTimeEntryButton
            timesheetId={timesheetId}
            isClockIn={isClockIn}
            isDisabled={!isAddTimeEntryAllowed(timeEntries.data)}
            updateTimesheet={(updateData: Partial<Timesheet>) => {
              services.timesheet.updateTimesheet({
                id: timesheetId,
                ...updateData,
              })
            }}
            onSuccess={() => {
              timeEntries.mutate()
              timesheet.mutate()
            }}
          />
        )}
      </Flex>
      <>
        {timeEntries.data && <TimesheetDetailsTable data={timeEntries.data} />}
      </>
    </VStack>
  )
})
