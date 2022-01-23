import router from 'next/router'

import { toDateString } from '@/lib/date'
import { routes } from '@/lib/routes'
import { computePayPeriod } from '@/modules/payrolls/computePayPeriod'
import { useCurrentUser } from '@/modules/users/hooks/useCurrentUser'
import Breadcrumbs from '@/ui/components/Breadcrumbs'

const pages = ({ role, payPeriodEnd }) => [
  {
    name: 'Timesheets',
    href: routes.dashboardPage(role, 'timesheets'),
    current: false,
  },
  {
    name: 'Current Pay Period',
    href:
      routes.dashboardPage(role, 'timesheets') +
      `?payPeriodEnd=${payPeriodEnd}`,
    current: true,
  },
]

export const TimesheetsBreadcrumbs = () => {
  const user = useCurrentUser()
  const payPeriodEnd = toDateString(computePayPeriod().end)

  const handleLinkClick = (url: string) => {
    console.log('handleLinkClick - url: ' + url)

    router.push(url)
  }

  return (
    <Breadcrumbs
      pages={pages({ role: user.role, payPeriodEnd })}
      onLinkClick={handleLinkClick}
    />
  )
}
