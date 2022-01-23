import router from 'next/router'

import { RoleIds } from '@/data/models/role'
import { routes } from '@/lib/routes'
import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'
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
  const payPeriodEnd = usePayPeriodEnd()

  const handleLinkClick = (url: string) => {
    console.log('handleLinkClick - url: ' + url)

    router.push(url)
  }

  return (
    <Breadcrumbs
      pages={pages({ role: RoleIds.Employee, payPeriodEnd })}
      onLinkClick={handleLinkClick}
    />
  )
}
