import { Box, Flex, Heading, VStack } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import React from 'react'

export interface PageSectionProps {
  title: React.ReactNode
  body: React.ReactNode
}

export const PageSection: React.FunctionComponent<PageSectionProps> = ({
  title,
  body,
}) => {
  const theme = useTheme()
  return (
    <Box
      bg="#fff"
      css={css`
        border: 1px solid ${theme.colors.gray[200]};
        border-radius: ${theme.radii.DEFAULT};
        width: 100%;
      `}
      px={5}
      py={6}
    >
      <Flex direction="column" gap={5}>
        <Heading as="h4" size="md" fontWeight="medium" lineHeight={1}>
          {title}
        </Heading>
        <VStack align="start" gap={1}>
          {body}
        </VStack>
      </Flex>
    </Box>
  )
}
