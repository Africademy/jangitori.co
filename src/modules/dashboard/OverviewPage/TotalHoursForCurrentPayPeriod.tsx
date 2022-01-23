import { Spinner } from '@chakra-ui/react'
import React from 'react'

import { User } from '@/data/models/user'
import { useTotalHoursForCurrentPayPeriod } from '@/modules/timesheets/hooks/useTotalHoursForCurrentPayPeriod'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { BasicStat } from '@/ui/components/Stat'

export interface TotalHoursForCurrentPayPeriodProps {
  employee: User
}

export const TotalHoursForCurrentPayPeriod: React.FunctionComponent<
  TotalHoursForCurrentPayPeriodProps
> = ({ employee }) => {
  const { data: totalHours, error } = useTotalHoursForCurrentPayPeriod(employee)

  if (error) return <ErrorMessage>{error?.message}</ErrorMessage>

  if (typeof totalHours === 'undefined') return <Spinner />

  return (
    <BasicStat
      label="Total hours this pay period"
      data={totalHours ? totalHours : '0'}
    />
  )
}
