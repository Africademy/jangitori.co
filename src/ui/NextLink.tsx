import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Link, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

import { pseudo } from '@/ui/utils/pseudo'
import { spacing } from '@/ui/utils/spacing'

export function NextLink({ children, ...props }: PropsWithChildren<LinkProps>) {
  return (
    <Link {...props} passHref>
      <StyledAnchor>{children}</StyledAnchor>
    </Link>
  )
}

const StyledAnchor = styled.a`
  display: inline-flex;
  align-items: center;
  padding: ${spacing(0, 1)};
  border: transparent;
  border-bottom-width: 2px;

  ${({ theme }) =>
    css`
      border-color: ${theme.colors.gray[300]};
      color: ${theme.colors.gray[500]};
      ${pseudo('_hover')} {
        border-color: ${theme.colors.gray[300]};
        color: ${theme.colors.gray[700]};
      }
      ${pseudo('_active')} {
        border-color: ${theme.colors.gray[300]};
        color: ${theme.colors.primary};
      }
      font-size: ${theme.fontSizes.md};
      font-weight: ${theme.fontWeights.bold};
    `}
`
