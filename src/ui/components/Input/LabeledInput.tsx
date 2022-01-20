import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { only } from '@/ui/utils/breakpoints'
import { spacing } from '@/ui/utils/spacing'

interface ILabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  text: string
  sm?: boolean
}

const LabeledInput = (props: ILabeledInputProps) => {
  return (
    <SLabel htmlFor={props.id}>
      <SText>{props.text}</SText>

      <SInput {...props}>{props.children}</SInput>
    </SLabel>
  )
}

const SLabel = styled.label`
  margin: ${spacing(3, 0)};
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
  width: 100%;
`

const SText = styled.div`
  width: 100%;

  ${({ theme }) =>
    css`
      font-size: ${theme.fontSizes.sm};
      color: ${theme.colors.gray[700]};
    `}
`

const SInput = styled.input`
  width: 100%;
  margin-top: ${spacing(1)};

  ${only('mobile')} {
    margin-top: 0;
  }

  ${({ theme }) => css`
    border-radius: ${theme.radii.md};
    border-color: ${theme.colors.gray[100]};
    border-width: 1px;
    border: 1px solid ${theme.colors.gray[200]};
    background-color: #fff;
    box-shadow: ${theme.shadows.sm};
  `};
`

export default LabeledInput
