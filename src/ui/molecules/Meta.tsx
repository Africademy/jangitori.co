import { Flex } from '@chakra-ui/react'

import { Typography } from '@/ui/atoms/Typography'

interface MetaProps {
  leftIcon: React.ComponentType<any>
  text: string
}

export const Meta = ({ leftIcon: LeftIcon, text }: MetaProps) => {
  return (
    <Flex gap={2} align="center">
      <LeftIcon />
      <Typography lineHeight={1}>{text}</Typography>
    </Flex>
  )
}
