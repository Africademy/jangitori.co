import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { ReactNode } from 'react'

import { largerThan } from '@/common/utils/breakpoints'

export interface SmallTitleProps {
  children: ReactNode
}

export const SmallTitle: React.FunctionComponent<SmallTitleProps> = ({
  children,
}) => {
  return <Title>{children}</Title>
}

const Title = styled.h3`
  ${({ theme }) =>
    css`
      font-size: ${theme.fontSizes.md};
      font-weight: ${theme.fontWeights.medium};
      color: ${theme.colors.gray[700]};

      ${largerThan('sm')} {
        font-size: ${theme.fontSizes.lg};
      }
    `}
`
