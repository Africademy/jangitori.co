import { observer } from 'mobx-react-lite'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { ShiftStep } from '@/modules/shifts/shiftStore'
import { useShiftStore } from '@/modules/stores'
import LoadingStack from '@/ui/components/LoadingStack'
import { Redirect } from '@/ui/components/Redirect'

import { StartShift } from './StartShift'

export const employeeRoutes = {
  timeClock: 'timeClock',
  overview: 'overview',
  timesheets: 'timesheets',
}

export const TimeClock = observer(function TimeClock({
  user: employee,
}: AuthenticatedPageProps) {
  const shiftStore = useShiftStore()

  if (shiftStore.step === ShiftStep.Initializing) return <LoadingStack />

  if (shiftStore.step === ShiftStep.Idle)
    return <StartShift employee={employee} />

  if (shiftStore.step === ShiftStep.ClockedIn)
    return <Redirect to={employeeRoutes.timeClock} />

  return <Redirect to={employeeRoutes.overview} />
})
