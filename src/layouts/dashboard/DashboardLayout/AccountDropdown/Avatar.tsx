import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps,
  WrapItem,
} from '@chakra-ui/react'
import React from 'react'

export interface AvatarProps {
  image?: string | undefined
  name?: string | undefined
  size?: string | undefined
  src?: string | undefined
}

export const Avatar: React.FunctionComponent<ChakraAvatarProps> = ({
  size = 'md',
  name = '',
  src,
  ...props
}) => {
  return (
    <WrapItem>
      <ChakraAvatar size={size} name={name} src={src} {...props} />
    </WrapItem>
  )
}
