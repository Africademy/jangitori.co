import { Button } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'
import { useAuthStore, useDashboardStore } from '@/modules/stores'
import { pseudo } from '@/ui/utils/pseudo'

import { EmployeeTabKey } from '../EmployeeDashboardPage'
import { OverviewTabCopy } from './OverviewTabCopy'

const ViewTimesheetButton = observer(function ViewTimesheetButton({}) {
  const authStore = useAuthStore()
  const employee = authStore.account?.uid
  const dashboardStore = useDashboardStore()
  const payPeriodEnd = usePayPeriodEnd()

  if (!employee) return null

  const switchToCurrentTimesheetDetailsTab = () => {
    dashboardStore.routeToTab(EmployeeTabKey.TIMESHEETS, {
      employee,
      payPeriodEnd,
    })
  }

  return (
    <SButton onClick={switchToCurrentTimesheetDetailsTab}>
      {OverviewTabCopy.LatestActivity.CurrentTimesheetLink}
    </SButton>
  )
})

const SButton = styled(Button)`
  opacity: 0.8;
  height: 44px;
  padding-left: 2rem;
  padding-right: 2rem;
  background: transparent;
  font-size: 1rem;

  ${({ theme }) =>
    css`
      font-weight: ${theme.fontWeights.medium};
      color: ${theme.colors.gray[700]};
      border: 0.8px solid ${theme.colors.gray[300]};
      ${pseudo('_hover')} {
        box-shadow: ${theme.shadows.sm};
        border: 0.8px solid ${theme.colors.gray[300]};
        background: transparent;
      }
    `}
`

export default ViewTimesheetButton
