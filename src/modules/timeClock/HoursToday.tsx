import { observer } from 'mobx-react-lite'

import { User } from '@/data/models/user'
import { ClockIconSolid } from '@/ui/icons/ClockIcon'

import { InitialTimeClockCopy } from './TimeClockCopy'
import { useTotalHoursToday } from './useTotalHoursToday'

export const HoursToday = observer(function HoursToday({
  employee,
}: {
  employee: User
}) {
  const { hours, error } = useTotalHoursToday(employee.id)

  return (
    <div className="bg-white rounded-md shadow-md px-5 py-3">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <ClockIconSolid />
          <span>{InitialTimeClockCopy.HoursToday}</span>
        </div>
        <div className="font-semibold">{`${
          typeof hours === 'undefined' || typeof error === 'undefined'
            ? '---'
            : `${hours}`
        }`}</div>
      </div>
    </div>
  )
})
