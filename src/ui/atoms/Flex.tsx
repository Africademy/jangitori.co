import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { flexbox, layout, space } from 'styled-system'

import { gap } from '@/ui/utils/spacing'

const baseFlexStyles = css`
  display: flex;
`

export const StyledFlex = styled.div`
  ${layout}
  ${space}
  ${flexbox}
  ${gap}
  ${baseFlexStyles}
`

export const Row = styled(StyledFlex)`
  align-items: center;
`

export const Col = styled(StyledFlex)`
  ${layout}
  ${gap}
  flex-direction: column;
`
