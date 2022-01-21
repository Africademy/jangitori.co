import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import React from 'react'

import { useTimesheetDetails } from '@/modules/dashboard/useTimesheetDetails'
import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'
import Typography from '@/ui/atoms/Typography/Typography'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { LoadingVStack } from '@/ui/components/LoadingVStack'

import { PageSection } from './PageSection'

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
    <PageSection
      title="Summary"
      body={
        <>
          <Typography lineHeight={1}>
            {'Last clocked in: '}
            {format(parseISO(timeEntries.data[0].timestamp), 'MMMM dd')}
            {' at '}
            {format(parseISO(timeEntries.data[0].timestamp), 'h:mm aa')}
            {'.'}
          </Typography>
          <Typography lineHeight={1}>
            Total hours: {timesheet.data.hours}
          </Typography>
        </>
      }
    />
  )
}
