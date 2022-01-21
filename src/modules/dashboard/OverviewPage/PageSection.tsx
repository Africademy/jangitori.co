import { Flex, Heading, VStack } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
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
        <VStack align="start" gap={1.5}>
          {body}
        </VStack>
      </Flex>
    </>
  )
}
