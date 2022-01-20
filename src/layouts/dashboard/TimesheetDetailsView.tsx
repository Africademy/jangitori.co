import { Button, Flex, VStack } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import { useState } from 'react'

import { useServices } from '@/app/appContext'
import { TimesheetQuery } from '@/db/api/timesheets/timesheetQueryKeys'
import { AuthenticatedPageProps } from '@/layouts/core/types/AuthenticatedPageProps'
import { shouldClockIn } from '@/lib/shouldClockIn'
import { useTimesheetDetails } from '@/modules/dashboard/useTimesheetDetails'
import { LoadingVStack } from '@/ui/components/LoadingVStack'
import { ErrorMessage } from '@/ui/error-message'
import Typography from '@/ui/Typography'
import { only } from '@/ui/utils/breakpoints'

import { TimesheetDetailsTable } from './TimesheetDetailsTable'

export const TimesheetDetailsView = ({
  query,
}: AuthenticatedPageProps & { query: TimesheetQuery }) => {
  const services = useServices('timeEntry', 'timesheet')
  const { timesheet, timeEntries } = useTimesheetDetails(query[2])

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
      const newEntry = await services.timeEntry.createEntry({
        timesheet: timesheet.data!.id,
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
            disabled={isBusy}
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
}
