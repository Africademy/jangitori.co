import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { useShiftStore } from '@/modules/stores'

import { EndShiftView } from './EndShiftView'
import { StartShiftView } from './StartShiftView'

export const OverviewPage = observer(function OverviewPage({
  account,
}: AuthenticatedPageProps) {
  const shiftStore = useShiftStore()

  useEffect(() => {
    shiftStore.loadCurrentShift()
  }, [shiftStore])

  if (shiftStore.request.isLoading) return null

  if (!shiftStore.shift) return <StartShiftView />

  if (!shiftStore.shift.clockOut) return <EndShiftView />

  return <p>ENDED SHIFT</p>
})
