import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

import { largerThan, only } from '@/ui/utils/breakpoints'
import { spacing } from '@/ui/utils/spacing'

export interface StatProps {
  title: string
  icon: React.ReactNode
  data: string
}

export const Stat: React.FunctionComponent<StatProps> = ({
  title,
  icon,
  data,
}) => {
  return (
    <SBody>
      <IconBox>{icon}</IconBox>
      <StatTextContainer>
        <StatTitle>{title}</StatTitle>
        <StatData>{data}</StatData>
      </StatTextContainer>
    </SBody>
  )
}

const SBody = styled.div`
  display: flex;
  align-items: center;

  min-width: 100%;
  gap: ${spacing(4)};

  svg {
    height: 0.75em !important;
    width: 0.75em !important;
    margin: auto;
  }
`

const IconBox = styled.div`
  font-size: 2.125rem;
  height: 1.5em;
  width: 1.5em;
  display: flex;
  align-items: center;
  ${({ theme }) => css`
    background-color: ${theme.colors.indigo[500]};
    color: #fff;
    border-radius: ${theme.radii.md};
  `}
`

const StatTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};

  dt,
  dd {
    line-height: none;
  }
`

const truncateStyles = css`
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
`

const StatTitle = styled.dt`
  ${({ theme }) =>
    css`
      font-size: ${theme.fontSizes.md};
      font-weight: ${theme.fontWeights.medium};
      color: ${theme.colors.gray[600]};
      ${truncateStyles}

      line-height: 1.25;

      ${largerThan('mobile')} {
        font-size: ${theme.fontSizes['base']};
      }
    `}
`

const StatData = styled.dd`
  ${({ theme }) =>
    css`
      font-weight: ${theme.fontWeights.medium};
      color: ${theme.colors.gray[900]};
      line-height: 1;
      ${only('mobile')} {
        font-size: ${theme.fontSizes['xl']};
      }
      ${largerThan('mobile')} {
        font-size: ${theme.fontSizes['2xl']};
      }
    `}
`
