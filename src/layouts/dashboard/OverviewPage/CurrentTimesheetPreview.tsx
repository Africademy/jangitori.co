import { Flex } from '@chakra-ui/react'
import React from 'react'

import { useTimesheetDetails } from '@/modules/dashboard/useTimesheetDetails'
import { usePayPeriodEnd } from '@/modules/payroll/usePayPeriodEnd'
import { LoadingVStack } from '@/ui/components/LoadingVStack'
import { ErrorMessage } from '@/ui/error-message'
import Typography from '@/ui/Typography'

export interface CurrentTimesheetPreviewProps {
  employee: string
}

export const CurrentTimesheetPreview: React.FunctionComponent<
  CurrentTimesheetPreviewProps
> = ({ employee }) => {
  const payPeriodEnd = usePayPeriodEnd()

  const { timesheet, entries } = useTimesheetDetails({ employee, payPeriodEnd })

  if (timesheet.error) {
    return <ErrorMessage>{timesheet.error.message}</ErrorMessage>
  }

  if (entries.error) {
    return <ErrorMessage>{entries.error.message}</ErrorMessage>
  }

  if (!timesheet.data || !entries.data) return <LoadingVStack numRows={3} />

  if (entries.data.length === 0)
    return <Typography>{"You haven't clocked in yet"}</Typography>

  return (
    <>
      <Flex direction="column" gap="3">
        <Typography>
          Most recent entry: {new Date(entries.data[0].timestamp).toString()}
        </Typography>
        <Typography>Total hours: {timesheet.data.hours}</Typography>
      </Flex>
    </>
  )
}
