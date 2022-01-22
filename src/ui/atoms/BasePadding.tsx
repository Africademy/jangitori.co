import styled from '@emotion/styled'

import { largerThan } from '@/ui/utils/breakpoints'

const BasePadding = styled.div`
  padding: 1.5rem 1rem;
  ${largerThan('mobile')} {
    padding: 1.5rem;
  }
`

export default BasePadding
