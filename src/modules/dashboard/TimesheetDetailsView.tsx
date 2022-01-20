import { Button, Flex, VStack } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import Sentry from '@sentry/nextjs'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { shouldClockIn } from '@/lib/shouldClockIn'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { useTimesheetDetails } from '@/modules/dashboard/useTimesheetDetails'
import { useRootStore, useServices } from '@/modules/stores'
import { TimesheetQuery } from '@/modules/timesheets/timesheetQueryKeys'
import Typography from '@/ui/atoms/Typography/Typography'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { LoadingVStack } from '@/ui/components/LoadingVStack'
import { only } from '@/ui/utils/breakpoints'

import { isAddTimeEntryAllowed } from '../time-entries/isAddTimeEntryAllowed'
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

  const theme = useTheme()
  const [isBusy, setIsBusy] = useState(false)

  if (timesheet.error || timeEntries.error) {
    return (
      <ErrorMessage>
        {mergeErrorMessages(timesheet.error, timeEntries.error)}
      </ErrorMessage>
    )
  }

  if (!timesheet.data || !timeEntries.data || !geolocationStore.isReady)
    return <LoadingVStack />

  const createNewEntry = async () => {
    setIsBusy(true)

    try {
      const location = geolocationStore.getCoordinatesOrThrow()

      const newEntry = await services.timeEntry.createEntry({
        timesheet: timesheet.data!.id,
        location,
      })
      timeEntries.mutate()

      const lastEntry = timeEntries.data!.at(-1)
      if (!lastEntry) return

      await services.timesheet.updateTimesheetHours({
        id: timesheet.data!.id,
        hours: parseFloat(
          (
            differenceInMinutes(
              new Date(newEntry.timestamp),
              new Date(lastEntry.timestamp),
            ) / 60
          ).toFixed(2),
        ),
      })

      timesheet.mutate()
    } catch (error) {
      Sentry.captureException(error)
      alert((error as Error).message)
    } finally {
      setIsBusy(false)
    }
  }

  const isClockIn = shouldClockIn(timeEntries.data)

  const handleNewTimeEntry = () => {
    const task = createNewEntry()

    toast.promise(task, {
      loading: `${isClockIn ? 'Clocking in' : 'Clocking out'}`,
      success: (index) => {
        return `Successfully ${isClockIn ? 'clocked in' : 'clocked out'}`
      },
      error: (error) => {
        console.warn('Failed to create index: ', error.message)
        return `Failed to ${isClockIn ? 'clock in' : 'clock out'}`
      },
    })
  }

  return (
    <VStack minW="100%">
      <Flex align="center" minW="100%" py={2} pb={5} justify="space-between">
        <Typography
          textAlign="left"
          fontWeight={theme.fontWeights.semibold}
          css={css`
            font-size: ${theme.fontSizes['lg']};
            ${only('mobile')} {
              font-size: ${theme.fontSizes['base']};
            }
          `}
        >
          Timesheet for pay period {query[2].payPeriodEnd}
        </Typography>
        {timeEntries.data && (
          <Button
            disabled={isBusy || !isAddTimeEntryAllowed(timeEntries.data)}
            variant="solid"
            colorScheme="blue"
            size="sm"
            onClick={handleNewTimeEntry}
          >
            {isClockIn ? 'Clock in' : 'Clock out'}
          </Button>
        )}
      </Flex>
      <>
        {timeEntries.data && <TimesheetDetailsTable data={timeEntries.data} />}
      </>
    </VStack>
  )
})
