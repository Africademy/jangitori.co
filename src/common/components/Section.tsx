/* eslint-disable react/display-name */
import { BoxProps, Flex, VStack } from '@chakra-ui/react'

export const Section = ({ children }: BoxProps) => {
  return (
    <Flex minW="100%" justify="center" align="center">
      <VStack minW="100%" spacing="3" my="5">
        {children}
      </VStack>
    </Flex>
  )
}

Section.Top = ({ children }: BoxProps) => {
  return (
    <Flex minW="100%" justify="space-between" align="center">
      {children}
    </Flex>
  )
}

Section.Body = ({ children }: BoxProps) => {
  return <Flex minW="100%">{children}</Flex>
}
