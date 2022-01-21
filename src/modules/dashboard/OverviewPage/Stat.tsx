import { Box } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
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
  const theme = useTheme()
  return (
    <Box
      bg="#fff"
      css={css`
        border: 0.8px solid ${theme.colors.gray[100]};
        border-radius: ${theme.radii.md};
        box-shadow: ${theme.shadows.sm};
        width: 100%;
      `}
      px={4}
      py={3}
    >
      <Container>
        <IconBox>{icon}</IconBox>
        <StatTextContainer>
          <StatTitle>{title}</StatTitle>
          <StatData>{data}</StatData>
        </StatTextContainer>
      </Container>
    </Box>
  )
}

const Container = styled.div`
  display: flex;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  min-width: 100%;
  gap: ${spacing(4)};

  svg {
    height: 0.75em !important;
    width: 0.75em !important;
    margin: auto;
  }
`

const IconBox = styled.div`
  font-size: 2rem;
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
      font-size: ${theme.fontSizes['base']};

      font-weight: ${theme.fontWeights.medium};
      color: ${theme.colors.gray[500]};
      ${truncateStyles}

      line-height: 1.25;
    `}
`

const StatData = styled.dd`
  ${({ theme }) =>
    css`
      font-weight: ${theme.fontWeights.semibold};
      color: ${theme.colors.gray[900]};
      line-height: 1;
      ${only('mobile')} {
        font-size: ${theme.fontSizes['2xl']};
      }
      ${largerThan('mobile')} {
        font-size: ${theme.fontSizes['3xl']};
      }
    `}
`
