import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { largerThan } from '@/ui/utils/breakpoints'

const basePadding = css`
  padding: 1.5rem 1rem;
  ${largerThan('mobile')} {
    padding: 1.5rem;
  }
`

export const Padding = styled.div`
  ${basePadding}
`

export default Padding
