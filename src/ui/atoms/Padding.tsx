import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { above } from '@/ui/utils/breakpoints'

const basePadding = css`
  padding: 1.5rem 1rem;
  ${above('mobile')} {
    padding: 1.5rem;
  }
`

export const Padding = styled.div`
  ${basePadding}
`

export default Padding
