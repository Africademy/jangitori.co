import { runInAction } from 'mobx'
import { useEffect } from 'react'

import { useShiftStore } from '@/modules/stores'

import { EndShift } from './EndShift'
import { StartShift } from './StartShift'

export const TimeClockFeature = () => {
  const shiftStore = useShiftStore()

  useEffect(() => {
    shiftStore.loadCurrentShift()
  }, [shiftStore])

  if (shiftStore.request.isLoading) return null

  if (!shiftStore.shift) return <StartShift />

  if (!shiftStore.shift.clockOut) return <EndShift />

  runInAction(() => shiftStore.reset())

  return null
}
