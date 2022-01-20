import { ButtonProps } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { pseudo } from '@/ui/utils/pseudo'
import { spacing } from '@/ui/utils/spacing'

const WideButton = dynamic(() => import('@/ui/atoms/Button/WideButton'))

import dynamic from 'next/dynamic'

import {
  baseCardFooterStyles,
  baseCardHeaderStyles,
  baseCardSubtitleStyles,
} from '@/ui/components/Card/styles'
import { IComponent, ParentComponentProps } from '@/ui/types'

export const FormSubmit: IComponent<ButtonProps> = ({ children, ...props }) => {
  return (
    <div
      css={css`
        ${baseCardFooterStyles}
        padding-top: ${spacing(3)};
      `}
    >
      <WideButton variant="primary" type="submit" {...props}>
        {children}
      </WideButton>
    </div>
  )
}

const SFormField = styled.div`
  width: 100%;
  margin-left: ${spacing(1)};

  ${pseudo('_first')} {
    margin-left: 0;
  }

  input {
    min-height: ${spacing(12)};
    padding: ${spacing(0, 3)};
    ${({ theme }) =>
      css`
        font-size: ${theme.fontSizes.md};
        line-height: 1;
      `}
  }
`
export const FormField: IComponent = ({ children }) => {
  return <SFormField>{children}</SFormField>
}

export const FormFields: IComponent = ({ children }: ParentComponentProps) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: ${spacing(3)};
        min-width: 100%;
        margin-bottom: 1rem;
      `}
    >
      {children}
    </div>
  )
}

export const FormSubtitle = ({ children }: ParentComponentProps) => {
  return (
    <div
      css={css`
        ${baseCardSubtitleStyles}
      `}
    >
      {children}
    </div>
  )
}

export const FormHeader: IComponent = ({ children }: ParentComponentProps) => {
  return (
    <div
      css={css`
        ${baseCardHeaderStyles}
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
        gap: 1.5rem;
      `}
    >
      {children}
    </div>
  )
}
