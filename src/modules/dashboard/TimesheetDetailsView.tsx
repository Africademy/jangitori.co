import { Button, Flex, VStack } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

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

export const TimesheetDetailsView = observer(function TimesheetDetailsView({
  query,
}: AuthenticatedPageProps & { query: TimesheetQuery }) {
  const services = useServices('timeEntry', 'timesheet')
  const { timesheet, timeEntries } = useTimesheetDetails(query[2])
  const { geolocationStore } = useRootStore()

  const theme = useTheme()
  const [isBusy, setIsBusy] = useState(false)

  if (timesheet.error) {
    return <ErrorMessage>{timesheet.error.message}</ErrorMessage>
  }

  if (timeEntries.error) {
    return <ErrorMessage>{timeEntries.error.message}</ErrorMessage>
  }

  if (!timesheet.data || !timeEntries.data) return <LoadingVStack />

  const handleNewEntry = async () => {
    setIsBusy(true)

    try {
      const location = geolocationStore.coordinates

      const newEntry = await services.timeEntry.createEntry({
        timesheet: timesheet.data!.id,
        location,
      })
      const lastEntry = timeEntries.data!.at(-1)

      if (!lastEntry) {
        timeEntries.mutate()
        return
      }

      const hours =
        differenceInMinutes(
          new Date(newEntry.timestamp),
          new Date(lastEntry.timestamp),
        ) / 60
      const newHours = parseFloat(hours.toFixed(2))

      await services.timesheet.updateTimesheetHours({
        id: timesheet.data!.id,
        hours: newHours,
      })
      timeEntries.mutate()
      timesheet.mutate()
    } catch (error) {
      console.log(error)
      alert((error as Error).message)
    } finally {
      setIsBusy(false)
    }
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
            onClick={handleNewEntry}
          >
            {shouldClockIn(timeEntries.data) ? 'Clock in' : 'Clock out'}
          </Button>
        )}
      </Flex>
      <>
        {timeEntries.data && <TimesheetDetailsTable data={timeEntries.data} />}
      </>
    </VStack>
  )
})
