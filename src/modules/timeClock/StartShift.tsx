import { observer } from 'mobx-react-lite'

import { User } from '@/data/models/user'
import { useLocationStore } from '@/modules/stores'
import LoadingStack from '@/ui/components/LoadingStack'

import { CurrentTimesheetButton } from './CurrentTimesheetButton'
import { HoursToday } from './HoursToday'
import { ShiftToggleButton } from './ShiftToggleButton'

export const StartShift = observer(function StartShift({
  employee,
}: {
  employee: User
}) {
  const locationStore = useLocationStore()

  return (
    <div className="layout py-5 flex-1 min-h-main flex flex-col gap-6">
      <HoursToday employee={employee} />
      <>
        {locationStore.coords ? (
          <div className="flex flex-col items-center w-full gap-3">
            <ShiftToggleButton />
            <CurrentTimesheetButton employee={employee} />
          </div>
        ) : (
          <LoadingStack />
        )}
      </>
    </div>
  )
})
