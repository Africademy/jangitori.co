import { Container, Flex, Skeleton } from '@chakra-ui/react'
import React from 'react'

export const LoadingScreen: React.FunctionComponent = () => {
  return (
    <Container>
      <Flex width="100%" alignItems="center" gap="1.5rem">
        <Skeleton height="1.5rem" />
        <Skeleton height="1.5rem" />
        <Skeleton height="1.5rem" />
      </Flex>
    </Container>
  )
}
