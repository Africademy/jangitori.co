import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'
import { CalendarIcon } from '@/ui/icons'
import { largerThan, only } from '@/ui/utils/breakpoints'
import { spacing } from '@/ui/utils/spacing'

import { OverviewPageCopy } from './OverviewPageCopy'
import { PageSection } from './PageSection'

export interface CurrentPayPeriodSectionProps {}

export const CurrentPayPeriodSection: React.FunctionComponent<
  CurrentPayPeriodSectionProps
> = () => {
  const payPeriodEnd = usePayPeriodEnd()

  return (
    <PageSection
      title={OverviewPageCopy.Upcoming.title}
      body={
        <>
          <div className="icon-container">
            <CalendarIcon />
          </div>
          <StatTextContainer>
            <StatTitle>{OverviewPageCopy.Upcoming.PayPeriod.title}</StatTitle>
            <StatData>{payPeriodEnd}</StatData>
          </StatTextContainer>
        </>
      }
    />
  )
}

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
