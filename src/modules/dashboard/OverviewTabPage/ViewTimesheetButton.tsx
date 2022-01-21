import { Button } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import { useLocalMobXStore } from '@/lib/mobx/LocalStoreProvider'
import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'
import { useRootStore } from '@/modules/stores'
import { timesheetQueryKeys } from '@/modules/timesheets/timesheetQueryKeys'
import { pseudo } from '@/ui/utils/pseudo'

import DashboardStore from '../DashboardStore'
import { OverviewTabCopy } from './OverviewTabCopy'

const ViewTimesheetButton = observer(function ViewTimesheetButton({}) {
  const { authStore } = useRootStore()
  const employee = authStore.account?.uid
  const dashboardStore = useLocalMobXStore<DashboardStore>()
  const payPeriodEnd = usePayPeriodEnd()

  if (!employee) return null

  const switchToCurrentTimesheetDetailsTab = () => {
    dashboardStore.setQuery(
      timesheetQueryKeys.detail({
        employee,
        payPeriodEnd,
      }),
    )
    dashboardStore.setTabKey('timesheets')
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
