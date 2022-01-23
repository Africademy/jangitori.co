import { Spinner } from '@chakra-ui/react'
import React from 'react'

import { User } from '@/data/models/user'
import { useLatestShift } from '@/modules/shifts/hooks/useLatestShift'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { BasicStat } from '@/ui/components/Stat'

export interface LastClockedInProps {
  employee: User
}

export const LastClockedIn: React.FunctionComponent<LastClockedInProps> = ({
  employee,
}) => {
  const { data: latestShift, error } = useLatestShift(employee)

  if (error) return <ErrorMessage>{error?.message}</ErrorMessage>

  if (typeof latestShift === 'undefined') return <Spinner />

  return (
    <BasicStat
      label="Last clocked in"
      data={
        latestShift ? latestShift.clockIn.timestamp : 'No time entries found.'
      }
    />
  )
}
