import { IComponent } from '@/ui/types'

import { baseCardFooterStyles } from './styles'

const CardFooter: IComponent = ({ children, ...props }) => {
  return (
    <div {...props} id="card-footer" css={baseCardFooterStyles}>
      {children}
    </div>
  )
}

export default CardFooter
