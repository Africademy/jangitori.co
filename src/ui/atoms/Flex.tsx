import { Box } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { gap } from '@/ui/utils/spacing'

const baseFlexStyles = css`
  display: flex;
`

export const StyledFlex = styled(Box)`
  ${gap}
  ${baseFlexStyles}
`

export const Row = styled(StyledFlex)`
  align-items: center;
`

export const Col = styled(StyledFlex)`
  flex-direction: column;
`
