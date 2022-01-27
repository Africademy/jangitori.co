import { useRouter } from 'next/router'

import { User } from '@/data/models/user'
import { routes } from '@/lib/routes'
import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'

import { InitialTimeClockCopy } from './TimeClockCopy'

export const CurrentTimesheetButton = ({ employee }: { employee: User }) => {
  const payPeriodEnd = usePayPeriodEnd()

  const router = useRouter()
  const handleClick = () => {
    router.push(
      routes.dashboardPage(
        employee.role,
        'timesheets' + `?payPeriodEnd=${payPeriodEnd}&employee=${employee.id}`,
      ),
    )
  }

  return (
    <button
      onClick={handleClick}
      className="bg-white shadow-md rounded-xl py-3 flex-1 w-full font-medium text-lg"
    >
      {InitialTimeClockCopy.ViewTimesheet}
    </button>
  )
}
