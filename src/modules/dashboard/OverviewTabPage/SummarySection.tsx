import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import React from 'react'

import { useTimesheetDetails } from '@/modules/dashboard/useTimesheetDetails'
import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'
import Typography from '@/ui/atoms/Typography/Typography'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { LoadingVStack } from '@/ui/components/LoadingVStack'
import { ClockIcon } from '@/ui/icons/ClockIcon'

import { PageSection } from './PageSection'
import { Stat } from './Stat'

export interface SummarySectionProps {
  employee: string
}

export const SummarySection: React.FunctionComponent<SummarySectionProps> = ({
  employee,
}) => {
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
  const lastClockedIn = parseISO(timeEntries.data[0].timestamp)

  return (
    <PageSection
      title="Summary"
      body={
        <>
          <Stat
            title={'Last clocked in'}
            data={`${format(lastClockedIn, 'MMM dd')} at ${format(
              lastClockedIn,
              'h:mm aa',
            )}`}
            icon={<ClockIcon />}
          />
          <Stat
            title={'Total time'}
            data={`${timesheet.data.hours} hours`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            }
          />
        </>
      }
    />
  )
}