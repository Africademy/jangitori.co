import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import { useAuthStore } from '@/modules/stores'

import AccountDropdown, { getAccountDropdownProps } from './AccountDropdown'

export const DashboardHeader = observer(function DashboardHeader() {
  const authStore = useAuthStore()
  return (
    <Header>
      <div className="layout w-full relative flex items-center justify-end h-full">
        {authStore.user && (
          <AccountDropdown {...getAccountDropdownProps(authStore.user)} />
        )}
      </div>
    </Header>
  )
})

const Header = styled.header(
  css`
    width: 100%;
    height: var(--header-height);
    background: #fff;
  `,
  ({ theme }) =>
    css`
      box-shadow: ${theme.shadows.md};
    `,
)
