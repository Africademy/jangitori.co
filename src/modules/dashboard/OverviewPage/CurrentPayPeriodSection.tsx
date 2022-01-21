import { HStack } from '@chakra-ui/react'
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
        <SBody>
          <IconBox>
            <CalendarIcon />
          </IconBox>
          <StatTextContainer>
            <StatTitle>{OverviewPageCopy.Upcoming.PayPeriod.title}</StatTitle>
            <StatData>{payPeriodEnd}</StatData>
          </StatTextContainer>
        </SBody>
      }
    />
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
