import { observer } from 'mobx-react-lite'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { ShiftStep } from '@/modules/shifts/shiftStore'
import { useShiftStore } from '@/modules/stores'
import LoadingStack from '@/ui/components/LoadingStack'
import { Redirect } from '@/ui/components/Redirect'

import { StartShift } from './StartShift'

export const TimeClockFeature = observer(function TimeClockFeature({
  user,
}: AuthenticatedPageProps) {
  const shiftStore = useShiftStore()

  if (shiftStore.step === ShiftStep.Initializing) return <LoadingStack />

  if (shiftStore.step === ShiftStep.Idle)
    return <StartShift employee={user.uid} />

  if (shiftStore.step === ShiftStep.ClockedIn)
    return <Redirect to={`/dashboard/employee/timeClock`} />

  return <Redirect to={`/dashboard/employee/overview`} />
})
