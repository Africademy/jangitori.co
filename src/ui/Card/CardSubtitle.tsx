import { Text } from '@chakra-ui/react'

import { IComponent } from '@/ui/types'

import { baseCardSubtitleStyles } from './styles'

const CardSubtitle: IComponent = ({ children, ...props }) => {
  return (
    <Text {...props} css={baseCardSubtitleStyles}>
      {children}
    </Text>
  )
}

export default CardSubtitle
