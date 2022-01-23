import { Skeleton, Stack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { ShiftStep } from '@/modules/shifts/shiftStore'
import { useShiftStore } from '@/modules/stores'
import { Redirect } from '@/ui/components/Redirect'

import { StartShift } from './StartShift'

export const TimeClockFeature = observer(function TimeClockFeature() {
  const shiftStore = useShiftStore()

  if (shiftStore.step === ShiftStep.Initializing)
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    )

  if (shiftStore.step === ShiftStep.Idle) return <StartShift />

  if (shiftStore.step === ShiftStep.ClockedIn)
    return <Redirect to={`/dashboard/employee/timeClock`} />

  return <Redirect to={`/dashboard/employee/overview`} />
})
