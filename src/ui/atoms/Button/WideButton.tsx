import styled from '@emotion/styled'

import Button, { ButtonProps } from './Button'

const WideButton = styled((props) => <Button {...props} />)<ButtonProps>`
  flex: 1 1 0% !important;
  min-width: 100%;
`

export default WideButton
