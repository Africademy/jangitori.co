import { css } from '@emotion/react'

import { StyledProps } from '@/lib/emotion/types'
import { spacing } from '@/ui/utils/spacing'

export const baseCardStyles = ({ theme }: StyledProps) =>
  css`
    box-shadow: ${theme.shadows.card};
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: ${theme.radii.card};
    max-width: 56rem;
  `

export const baseCardHeaderStyles = css`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
`

import { smallerThan } from '@/ui/utils/breakpoints'

export const baseCardSubtitleStyles = css`
  font-size: 1.125rem;
  line-height: 1.5;
  ${smallerThan('md')} {
    font-size: 1rem;
  }
`

export const baseCardFooterStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
`
