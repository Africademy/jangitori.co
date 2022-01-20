import { Flex } from '@chakra-ui/react'
import React from 'react'

import { useTimesheetDetails } from '@/modules/dashboard/useTimesheetDetails'
import { usePayPeriodEnd } from '@/modules/payroll/usePayPeriodEnd'
import Typography from '@/ui/atoms/Typography/Typography'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { LoadingVStack } from '@/ui/components/LoadingVStack'

export interface CurrentTimesheetPreviewProps {
  employee: string
}

export const CurrentTimesheetPreview: React.FunctionComponent<
  CurrentTimesheetPreviewProps
> = ({ employee }) => {
  const payPeriodEnd = usePayPeriodEnd()

  const { timesheet, timeEntries } = useTimesheetDetails({
    employee,
    payPeriodEnd,
  })

  if (timesheet.error) {
    return <ErrorMessage>{timesheet.error.message}</ErrorMessage>
  }

  if (timeEntries.error) {
    return <ErrorMessage>{timeEntries.error.message}</ErrorMessage>
  }

  if (!timesheet.data || !timeEntries.data) return <LoadingVStack numRows={3} />

  if (timeEntries.data.length === 0)
    return <Typography>{"You haven't clocked in yet"}</Typography>

  return (
    <>
      <Flex direction="column" gap="3">
        <Typography>
          Most recent entry:{' '}
          {new Date(timeEntries.data[0].timestamp).toString()}
        </Typography>
        <Typography>Total hours: {timesheet.data.hours}</Typography>
      </Flex>
    </>
  )
}
