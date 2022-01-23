import { Button } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { useRouter } from 'next/router'

import { routes } from '@/lib/routes'
import { useCurrentUser } from '@/modules/accounts/hooks/useCurrentUser'
import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'

import { InitialTimeClockCopy } from './TimeClockCopy'

export const CurrentTimesheetButton = () => {
  const employee = useCurrentUser()

  const theme = useTheme()

  const payPeriodEnd = usePayPeriodEnd()

  const router = useRouter()
  const handleClick = () => {
    router.push(
      routes.dashboardPage(
        employee.role,
        'timesheets' + `?payPeriodEnd=${payPeriodEnd}&employee=${employee.uid}`,
      ),
    )
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