import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { ShiftStep } from '@/modules/shifts/shiftStore'
import { useShiftStore } from '@/modules/stores'
import LoadingStack from '@/ui/components/LoadingStack'

import { EndShift } from './EndShift'
import { StartShift } from './StartShift'

export const employeeRoutes = {
  timeClock: 'timeClock',
  overview: 'overview',
  timesheets: 'timesheets',
}

const TimeClockPage = observer(function TimeClock({
  user: employee,
}: AuthenticatedPageProps) {
  const shiftStore = useShiftStore()

  useEffect(() => {
    shiftStore.init()
  }, [])

  if (shiftStore.step === ShiftStep.Initializing) {
    console.log('Step: INITIALIZING')

    return <LoadingStack />
  }
  if (shiftStore.step === ShiftStep.Idle) {
    console.log('Step: IDLE')

    return <StartShift employee={employee} />
  }

  console.log('Step: CLOCKED_IN')

  return <EndShift />
})

export default TimeClockPage
