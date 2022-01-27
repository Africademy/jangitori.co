import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { DashboardBottomNav } from './DashboardBottomNav'
import { DashboardHeader } from './DashboardHeader'

export interface DashboardLayoutProps {}

const DashboardLayout = function DashboardLayout({
  children,
}: React.PropsWithChildren<DashboardLayoutProps>) {
  return (
    <>
      <DashboardHeader />
      <Main>{children}</Main>
      <DashboardBottomNav />
    </>
  )
}

const Main = styled.main(
  ({ theme }) =>
    css`
      width: 100%;
      min-height: var(--main-height);
      background: ${theme.colors.gray[50]};
    `,
)

export default DashboardLayout
