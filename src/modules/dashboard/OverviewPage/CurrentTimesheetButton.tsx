import { Button } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'

import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'
import { useDashboardStore } from '@/modules/stores'

import { EmployeeTabKey } from '../EmployeeDashboardPage'
import { InitialTimeClockCopy } from './TimeClockCopy'

export const CurrentTimesheetButton = ({ employee }: { employee: string }) => {
  const theme = useTheme()

  const dashboardStore = useDashboardStore()
  const payPeriodEnd = usePayPeriodEnd()

  const handleClick = () => {
    dashboardStore.routeToTab(EmployeeTabKey.TIMESHEETS, {
      employee,
      payPeriodEnd,
    })
  }

  return (
    <Button
      bg={'white'}
      border={`0.7px solid ${theme.colors.gray[200]}`}
      w="100%"
      shadow={'sm'}
      onClick={handleClick}
      py={6}
    >
      {InitialTimeClockCopy.ViewTimesheet}
    </Button>
  )
}
