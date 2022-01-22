import { useEffect } from 'react'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { useShiftStore } from '@/modules/stores'

import { EndShiftView } from './EndShiftView'
import { StartShiftView } from './StartShiftView'

export const OverviewPage = ({ account }: AuthenticatedPageProps) => {
  const shiftStore = useShiftStore()

  useEffect(() => {
    shiftStore.loadCurrentShift()
  }, [shiftStore])

  if (!shiftStore.request.isLoading && !shiftStore.shift)
    return <StartShiftView />

  return <EndShiftView />
}
