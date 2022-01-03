import { css } from '@emotion/react'

import { IComponent } from '../types'

const CardBody: IComponent = ({ children, ...props }) => {
  return (
    <div
      {...props}
      id="card-body"
      css={css`
        flex: 1;
        min-width: 100%;
      `}
    >
      {children}
    </div>
  )
}

export default CardBody
