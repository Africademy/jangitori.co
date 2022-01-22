import router from 'next/router'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { toDateString } from '@/lib/date'
import { routes } from '@/lib/routes'
import Breadcrumbs from '@/ui/components/Breadcrumbs'

import { computePayPeriod } from '../payrolls/computePayPeriod'

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
