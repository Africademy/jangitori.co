import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { LayoutProps } from 'framer-motion'
import { layout } from 'styled-system'

import { rem } from '@/ui/utils/spacing'

export const Col = styled.div<LayoutProps & { gap?: number }>`
  ${layout}
  display: flex;
  flex-direction: column;
  ${({ gap = 0 }) => css`
    gap: ${rem(gap * 3)};
  `}
`
