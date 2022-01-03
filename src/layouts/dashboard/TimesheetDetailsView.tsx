import { Button, Flex, VStack } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import { useState } from 'react'

import { only } from '@/common/utils/breakpoints'
import { shouldClockIn } from '@/modules/lib/shouldClockIn'
import { useServices } from '@/modules/services/useServices'
import { TimesheetDetailsQuery } from '@/modules/timesheets/timesheetsQueryBuilder'
import { ErrorMessage } from '@/ui/error-message'
import Typography from '@/ui/Typography'

import { AuthenticatedPageProps } from '../core/types/AuthenticatedPageProps'
import { LoadingVStack } from './OverviewPage/LoadingVStack'
import { TimesheetDetailsTable } from './TimesheetDetailsTable'
import { useTimesheetDetails } from './useTimesheetDetails'

export const TimesheetDetailsView = ({
  query,
}: AuthenticatedPageProps & { query: TimesheetDetailsQuery }) => {
  const services = useServices('timesheetEntry', 'timesheet')
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
      const newEntry = await services.timesheetEntry.createTimesheetEntry({
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
