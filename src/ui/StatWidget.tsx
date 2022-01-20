import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { ComponentType } from 'react'

import { StyledProps } from '@/lib/emotion/types'
import { largerThan, only } from '@/ui/utils/breakpoints'
import { spacing } from '@/ui/utils/spacing'

export interface StatWidgetProps {
  name: string
  stat: string
  icon: ComponentType<any>
}

const StatWidget: React.FunctionComponent<StatWidgetProps> = ({
  name,
  stat,
  icon: IconComponent,
}) => {
  return (
    <StyledStat hasIcon={Boolean(IconComponent)}>
      {IconComponent && (
        <div className="icon-container">
          <IconComponent />
        </div>
      )}
      <StatTextContainer>
        <StatTitle>{name}</StatTitle>
        <StatData>{stat}</StatData>
      </StatTextContainer>
    </StyledStat>
  )
}

const withIconStyles = ({ theme }: StyledProps) => css`
  display: flex;
  align-items: center;
  min-width: 100%;
  gap: ${spacing(4)};

  div.icon-container {
    font-size: 2.25rem;
    height: 2em;
    width: 2em;
    background-color: ${theme.colors.primary};
    color: #fff;
    border-radius: ${theme.radii.lg};
    display: flex;
    align-items: center;
  }

  svg {
    height: 1em;
    width: 1em;
    margin: auto;
  }
`

const StyledStat = styled.div<{ hasIcon: boolean }>`
  overflow: hidden;
  padding: ${spacing(6)};
  height: 7rem;
  background-color: #fff;
  ${({ theme }) =>
    css`
      box-shadow: ${theme.shadows.base};
      border-radius: ${theme.radii.lg};
    `}
  ${({ hasIcon }) => hasIcon && withIconStyles}
`
const StatTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(1)};

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

      ${largerThan('mobile')} {
        font-size: ${theme.fontSizes['base']};
      }
    `}
`

const StatData = styled.dd`
  ${({ theme }) =>
    css`
      font-weight: ${theme.fontWeights.semibold};
      color: ${theme.colors.gray[900]};
      ${only('mobile')} {
        font-size: ${theme.fontSizes['xl']};
      }
      ${largerThan('mobile')} {
        font-size: ${theme.fontSizes['2xl']};
      }
    `}
`

export default StatWidget
