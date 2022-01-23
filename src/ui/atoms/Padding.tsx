import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { padding } from 'styled-system'

import { largerThan } from '@/ui/utils/breakpoints'

const basePadding = css``

export type IPad = Record<
  | 'p'
  | 'padding'
  | 'pt'
  | 'paddingTop'
  | 'pb'
  | 'paddingBottom'
  | 'pl'
  | 'paddingLeft'
  | 'pr'
  | 'paddingRight'
  | 'py'
  | 'paddingY'
  | 'px'
  | 'paddingX',
  number
>

export const Padding = styled.div`
  ${basePadding}
  ${padding}
`

export default Padding
