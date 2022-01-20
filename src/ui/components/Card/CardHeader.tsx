import { IComponent } from '@/ui/types'

import { baseCardHeaderStyles } from './styles'

const CardHeader: IComponent = ({ children, ...props }) => {
  return (
    <div {...props} id="card-header" css={baseCardHeaderStyles}>
      {children}
    </div>
  )
}

export default CardHeader
