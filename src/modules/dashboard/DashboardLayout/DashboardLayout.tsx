import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { DashboardHeader } from './DashboardHeader'

export interface DashboardLayoutProps {}

const DashboardLayout = function DashboardLayout({
  children,
}: React.PropsWithChildren<DashboardLayoutProps>) {
  return (
    <>
      <DashboardHeader />
      <Main>{children}</Main>
    </>
  )
}

const Main = styled.main(
  ({ theme }) =>
    css`
      width: 100%;
      max-height: var(--main-height);
      background: ${theme.colors.gray[50]};
      flex: 1;
    `,
)

export default DashboardLayout
