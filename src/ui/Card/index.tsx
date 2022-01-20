export * from './styles'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { IComponent } from '@/ui/types'
import { spacing } from '@/ui/utils/spacing'

import CardBody from './CardBody'
import CardFooter from './CardFooter'
import CardHeader from './CardHeader'
import CardSubtitle from './CardSubtitle'
import { baseCardStyles } from './styles'

const cardSpacing = css`
  padding-left: ${spacing(12)};
  padding-right: ${spacing(12)};
  padding-top: ${spacing(12)};
  padding-bottom: ${spacing(12)};
  gap: ${spacing(8)};
`

const StyledThemeUICard = styled.div`
  ${baseCardStyles}
  ${cardSpacing}
`

type ICompositionComponent = IComponent & {
  Header: IComponent
  Subtitle: IComponent
  Body: IComponent
  Footer: IComponent
}

/**
 * Serves as an adapter for external components used to create
 * the app's Card component.
 */
const Card: ICompositionComponent = ({ children, ...props }) => {
  return <StyledThemeUICard {...props}>{children}</StyledThemeUICard>
}

Card.Header = CardHeader
Card.Subtitle = CardSubtitle
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
