import { Button, Flex, Tooltip, VStack } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import Sentry from '@sentry/nextjs'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { toDateString } from '@/lib/date'
import {
  calendarDateToDate,
  truncateCalendarDate,
} from '@/lib/date/calendarDate'
import { shouldClockIn } from '@/lib/shouldClockIn'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { useTimesheetDetails } from '@/modules/dashboard/useTimesheetDetails'
import { useRootStore, useServices } from '@/modules/stores'
import { TimesheetQuery } from '@/modules/timesheets/timesheetQueryKeys'
import Typography from '@/ui/atoms/Typography/Typography'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { LoadingVStack } from '@/ui/components/LoadingVStack'
import { QuestionIcon } from '@/ui/icons/QuestionIcon'
import { largerThan, only } from '@/ui/utils/breakpoints'
import { pseudo } from '@/ui/utils/pseudo'

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

  const [isBusy, setIsBusy] = useState(false)
  const theme = useTheme()

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
        <SText>
          Pay period end {truncateCalendarDate(query[2].payPeriodEnd)}
        </SText>
        {timeEntries.data && (
          <div className="flex items-center gap-3">
            {!isAddTimeEntryAllowed(timeEntries.data) && (
              <Tooltip
                label="You must wait at least 15 minutes between time punches."
                fontSize="md"
              >
                <IconBox>
                  <QuestionIcon />
                </IconBox>
              </Tooltip>
            )}
            <Button
              disabled={isBusy || !isAddTimeEntryAllowed(timeEntries.data)}
              variant="solid"
              colorScheme="blue"
              size="md"
              onClick={handleNewTimeEntry}
              _disabled={{
                background: theme.colors.gray[200],
                color: theme.colors.gray[400],
              }}
              _hover={{
                _notDisabled: {
                  background: theme.colors.primary[700],
                },
              }}
            >
              {isClockIn ? 'Clock in' : 'Clock out'}
            </Button>
          </div>
        )}
      </Flex>
      <>
        {timeEntries.data && <TimesheetDetailsTable data={timeEntries.data} />}
      </>
    </VStack>
  )
})

const IconBox = styled.div`
  font-size: 1rem;
  ${({ theme }) =>
    css`
      color: ${theme.colors.gray[500]};
      ${pseudo('_hover')} {
        color: ${theme.colors.gray[800]};
      }
    `}

  svg {
    height: 0.75rem;
    width: 0.75rem;
  }
`

const SText = styled.div`
  ${({ theme }) =>
    css`
      font-weight: ${theme.fontWeights.semibold};
      font-size: ${theme.fontSizes['lg']};
      ${largerThan('mobile')} {
        font-size: ${theme.fontSizes['xl']};
      }
    `}
`
