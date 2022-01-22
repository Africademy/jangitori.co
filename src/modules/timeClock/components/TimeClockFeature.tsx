import { Skeleton, Stack } from '@chakra-ui/react'
import { when } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { useShiftStore } from '@/modules/stores'
import { Redirect } from '@/ui/components/Redirect'

import { EndShift } from './EndShift'
import { StartShift } from './StartShift'

export const TimeClockFeature = observer(function TimeClockFeature() {
  const shiftStore = useShiftStore()

  useEffect(() => {
    return when(
      () => !shiftStore.initialized,
      () => shiftStore.initialized,
    )
  }, [])

  useEffect(() => {
    return when(
      () => shiftStore.shouldReset,
      () => shiftStore.reset(),
    )
  }, [])

  if (shiftStore.initialized)
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    )

  if (shiftStore.isClockIn) return <StartShift />

  if (shiftStore.isClockOut)
    return <Redirect to={`/dashboard/employee/time-clock`} />

  return <Redirect to={`/dashboard/employee/overview`} />
})
