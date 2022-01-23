import { Box } from '@chakra-ui/react'
import { css } from '@emotion/react'

import { DashboardBottomNav } from './DashboardBottomNav'
import { DashboardHeader } from './DashboardHeader'

export interface DashboardLayoutProps {}

const DashboardLayout = function DashboardLayout({
  children,
}: React.PropsWithChildren<DashboardLayoutProps>) {
  return (
    <div
      css={css`
        min-height: 100%;
        position: relative;
      `}
    >
      <DashboardHeader />
      <Box
        bg={'gray.50'}
        css={css`
          height: calc(90vh);
        `}
      >
        {children}
      </Box>
      <DashboardBottomNav />
    </div>
  )
}

export default DashboardLayout
