import { Box, Heading, VStack } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { largerThan, only } from '@/ui/utils/breakpoints'

const PageHeadingBox = styled.div`
  background: #fff;
  line-height: none !important;
  width: 100%;
  min-height: 21vh;
  padding: 1.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) =>
    css`
      border-bottom: 0.8px solid ${theme.colors.gray[200]};
    `};
`

export const PageHeading = ({ children }) => (
  <PageHeadingBox>
    <Box
      width="85vw"
      mx="auto"
      css={css`
        ${largerThan('mobile')} {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      `}
    >
      {children}
    </Box>
  </PageHeadingBox>
)

export const PageTopActions = ({ children }) => (
  <Box
    css={css`
      ${only('mobile')} {
        padding-top: 1.75rem;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    `}
  >
    {children}
  </Box>
)

export const PageTitle = ({ children }) => (
  <Heading as="h3" size="xl" lineHeight={1} fontWeight="bold">
    {children}
  </Heading>
)

const PageBodyBox = styled.div`
  padding: 1.5rem 1rem;
  ${largerThan('mobile')} {
    padding: 1.5rem;
  }
`
export const PageBody = ({ children }) => (
  <PageBodyBox>
    <VStack gap={3}>{children}</VStack>
  </PageBodyBox>
)
