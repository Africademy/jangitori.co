import { useAsync } from '@react-hookz/web'
import { useMemo, useState } from 'react'

import { usePayPeriodEnd } from '@/common/hooks/usePayPeriodEnd'
import { toPgTime } from '@/modules/lib/pgTime'
import { useService } from '@/modules/services'
import { isAddTimeEntryAllowed } from '@/modules/timeCards/isAddTimeEntryAllowed'
import { useTimeCardQuery } from '@/modules/timeCards/useTimeCardQuery'

export function useAddTimeEntryButton(employee: string) {
  const timeCardService = useService('timeCard')
  const payPeriodEnd = usePayPeriodEnd()

  const {
    mutate: mutateTimeCard,
    data: timeCard,
    isLoading: isTimeCardLoading,
  } = useTimeCardQuery({ employee, payPeriodEnd })

  const [isAddingTimeEntry, setIsClockingIn] = useState(false)
  const [addTimeEntryError, setClockInError] = useState<Error | null>(null)

  const isAddTimeEntryDisabled = useMemo(
    function getIsAddTimeEntryDisabled() {
      return (
        isTimeCardLoading ||
        isAddingTimeEntry ||
        (timeCard && !isAddTimeEntryAllowed(timeCard))
      )
    },
    [isTimeCardLoading, isAddingTimeEntry, timeCard],
  )

  async function createTimeCard(employee: string) {
    mutateTimeCard(
      await timeCardService.createTimeCard({
        employee,
      }),
    )
  }

  async function addTimeEntry(timeCard: number) {
    mutateTimeCard(
      await timeCardService.appendEntry({
        id: timeCard,
        entry: {
          time: toPgTime(new Date()),
          location: { longitude: '0.0', latitude: '0.0' },
        },
      }),
    )
  }

  const [_, actions] = useAsync(async () => {
    if (typeof timeCard === 'undefined')
      throw new Error(
        'not allowed to use NewTimeEntryButton when timeCard is still loading',
      )
    setClockInError(null)
    setIsClockingIn(true)
    try {
      const promise = timeCard
        ? addTimeEntry(timeCard.id)
        : createTimeCard(employee)

      await promise
    } catch (err) {
      setClockInError(err as Error)
    } finally {
      setIsClockingIn(false)
    }
  })

  const onClick = actions.execute

  return {
    isAddingTimeEntry,
    addTimeEntryError,
    onClick,
    isAddTimeEntryDisabled,
  }
}
