import { Skeleton, Stack } from '@chakra-ui/react'
import { when } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { useShiftStore } from '@/modules/stores'
import { Redirect } from '@/ui/components/Redirect'

import { ShiftStep } from '../shifts/shiftStore'
import { StartShift } from './StartShift'

export const TimeClockFeature = observer(function TimeClockFeature() {
  const shiftStore = useShiftStore()

  useEffect(() => {
    return when(
      () => shiftStore.step === ShiftStep.Initializing,
      () => shiftStore.init(),
    )
  }, [])

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
    return <Redirect to={`/dashboard/employee/time-clock`} />

  return <Redirect to={`/dashboard/employee/overview`} />
})
