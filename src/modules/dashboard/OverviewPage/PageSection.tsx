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
    <>
      <Flex direction="column" gap={5} minW="100%">
        <Heading
          as="h4"
          size="md"
          fontWeight="medium"
          color={theme.colors.gray[700]}
          lineHeight={1}
        >
          {title}
        </Heading>
        <Box
          bg="#fff"
          css={css`
            border: 0.8px solid ${theme.colors.gray[100]};
            border-radius: ${theme.radii.md};
            box-shadow: ${theme.shadows.sm};
            width: 100%;
          `}
          px={5}
          py={6}
        >
          <VStack align="start" gap={1}>
            {body}
          </VStack>
        </Box>
      </Flex>
    </>
  )
}
