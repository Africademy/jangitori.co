import { Heading, Text } from '@chakra-ui/react'

export const Typography = Text

export const H3 = ({ children }) => (
  <Heading as="h3" fontSize="26px" fontWeight="semibold">
    {children}
  </Heading>
)
