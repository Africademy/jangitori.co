import { Box, Flex, VStack } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { title } from 'process'
import React from 'react'

import { mergeErrorMessages } from '@/lib/errors'
import { StatusTag } from '@/modules/reviewStatus'
import { computeHoursWorked } from '@/modules/timeClock/computeTimeWorked'
import { TimeClockButton } from '@/modules/timeClock/TimeClockButton'
import { H3 } from '@/ui/atoms/Typography'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import LoadingStack from '@/ui/components/LoadingStack'
import { CalculatorIconSolid } from '@/ui/icons/CalculatorIcon'
import { CalendarIconSolid } from '@/ui/icons/CalendarIcon'
import { Meta } from '@/ui/molecules/Meta'
import { only } from '@/ui/utils/breakpoints'

import { TimesheetDetailsQuery } from '../timesheetDetailsQuery'
import { TimesheetsBreadcrumbs } from '../TimesheetsBreadcrumbs'
import { PageHeading } from './components'
import { useTimesheetDetails } from './useTimesheetDetails'

export interface TimesheetDetailsPageProps {
  query: TimesheetDetailsQuery
}

const TimesheetDetailsPage: React.FunctionComponent<
  TimesheetDetailsPageProps
> = ({ query: { employee, payPeriodEnd } }) => {
  const { timesheet, timeEntries } = useTimesheetDetails({
    employee,
    payPeriodEnd,
  })

  if (timesheet.error || timeEntries.error) {
    return (
      <ErrorMessage>
        {mergeErrorMessages(timesheet.error, timeEntries.error)}
      </ErrorMessage>
    )
  }

  const timesheetData = timesheet.data
  const timeEntriesData = timeEntries.data

  if (!timesheetData || !timeEntriesData) return <LoadingStack />

  return (
    <>
      <PageHeading>
        <VStack w="100%" align="start" gap={1}>
          <TimesheetsBreadcrumbs />
          <Flex justify="space-between" w="100%">
            <H3>{title}</H3>
            <StatusTag status={timesheetData.status} />
          </Flex>
          <VStack w="100%" align="start" gap={0}>
            <Meta
              leftIcon={CalendarIconSolid}
              text={`Due on ${payPeriodEnd}`}
            />
            <Meta
              leftIcon={CalculatorIconSolid}
              text={`Total ${computeHoursWorked(timeEntriesData)} hours`}
            />
          </VStack>
          <Box
            css={css`
              ${only('mobile')} {
                padding-top: 0.75rem;
                display: flex;
                align-items: center;
                gap: 1rem;
              }
            `}
          >
            <TimeClockButton />
          </Box>
        </VStack>
      </PageHeading>
    </>
  )
}

export default TimesheetDetailsPage
