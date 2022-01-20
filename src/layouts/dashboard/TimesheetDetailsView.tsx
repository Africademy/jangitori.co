import { Button, Flex, VStack } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import { useState } from 'react'

import { TimesheetQuery } from '@/db/timesheets/timesheetQueryKeys'
import { AuthenticatedPageProps } from '@/layouts/core/types/AuthenticatedPageProps'
import { useTimesheetDetails } from '@/modules/dashboard/useTimesheetDetails'
import { shouldClockIn } from '@/modules/lib/shouldClockIn'
import { useServices } from '@/modules/services/useServices'
import { LoadingVStack } from '@/ui/components/LoadingVStack'
import { ErrorMessage } from '@/ui/error-message'
import Typography from '@/ui/Typography'
import { only } from '@/ui/utils/breakpoints'

import { TimesheetDetailsTable } from './TimesheetDetailsTable'

export const TimesheetDetailsView = ({
  query,
}: AuthenticatedPageProps & { query: TimesheetQuery }) => {
  const services = useServices('TimeEntry', 'timesheet')
  const { timesheet, entries } = useTimesheetDetails(query[2])

  const theme = useTheme()
  const [isBusy, setIsBusy] = useState(false)

  if (timesheet.error) {
    return <ErrorMessage>{timesheet.error.message}</ErrorMessage>
  }

  if (entries.error) {
    return <ErrorMessage>{entries.error.message}</ErrorMessage>
  }

  if (!timesheet.data || !entries.data) return <LoadingVStack />

  const handleNewEntry = async () => {
    setIsBusy(true)

    try {
      const newEntry = await services.TimeEntry.createEntry({
        timesheet: timesheet.data!.id,
      })
      const lastEntry = entries.data!.at(-1)

      if (!lastEntry) {
        entries.mutate()
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
      entries.mutate()
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
        {entries.data && (
          <Button
            disabled={isBusy}
            variant="solid"
            colorScheme="blue"
            size="sm"
            onClick={handleNewEntry}
          >
            {shouldClockIn(entries.data) ? 'Clock in' : 'Clock out'}
          </Button>
        )}
      </Flex>
      <>{entries.data && <TimesheetDetailsTable data={entries.data} />}</>
    </VStack>
  )
}
