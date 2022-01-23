import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { padding, PaddingProps } from 'styled-system'

import { largerThan } from '@/ui/utils/breakpoints'

const basePadding = css`
  padding: 1.5rem 1rem;
  ${largerThan('mobile')} {
    padding: 1.5rem;
  }
`

const SPadding = styled.div<PaddingProps>`
  ${basePadding}
  ${padding}
`

export const Padding: React.FunctionComponent<PaddingProps> = ({
  children,
  ...props
}) => {
  return <SPadding {...props}>{children}</SPadding>
}

export default Padding
