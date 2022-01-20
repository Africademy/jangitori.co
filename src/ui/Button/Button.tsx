import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { forwardRef, Ref } from 'react'

import { darken, transparentize } from '@/layouts/core/theming/color'
import { StyledProps } from '@/modules/emotion/types'
import { pseudo } from '@/ui/utils/pseudo'
import { spacing } from '@/ui/utils/spacing'

export type BtnVariant = 'primary' | 'secondary' | 'default'

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  variant?: BtnVariant
  isLoading?: boolean
  disabled?: boolean | Falsy
}

type BtnVariantColors = { fg: string; bg: string }

interface ClickableStyleProps {
  variant?: BtnVariant
}

function buttonVariant({
  theme,
  variant = 'default',
}: StyledProps<ClickableStyleProps>) {
  const buttonVariants: Record<BtnVariant, BtnVariantColors> = {
    primary: {
      fg: '#fff',
      bg: theme.colors.primary,
    },
    secondary: {
      fg: theme.colors.text,
      bg: '#fff',
    },
    default: {
      fg: theme.colors.text,
      bg: '#fff',
    },
  }

  return buttonVariants[variant]
}

/**
 * TODO: make active pseudo selector work
 */
export const clickableStyles = (props: StyledProps<ClickableStyleProps>) => {
  const { fg, bg } = buttonVariant(props)
  return css`
    color: ${transparentize(fg, 0.85)};
    background-color: ${bg};
    ${pseudo('_hover')}:and:not(:disabled) {
      color: ${fg};
      background: ${darken(bg, 7.5)};
    }
    ${pseudo('_active')}:and:not(:disabled) {
      color: ${fg};
      background: ${darken(bg, 15)};
    }
  `
}

const StyledButton = styled.button<ButtonProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing(2, 5)};
  border: transparent;
  height: ${spacing(12)};
  max-width: 45%;

  ${({ theme }) => css`
    font-size: ${theme.fontSizes.md};
    box-shadow: ${theme.shadows.sm};
    font-weight: ${theme.fontWeights.bold};
    border-radius: ${theme.radii.md};

    ${pseudo('_disabled')} {
      background-color: ${theme.colors.gray[300]};
      color: ${theme.colors.gray[500]};
    }
  `}
  ${clickableStyles}
`

const Button = forwardRef(
  (
    { isLoading = false, disabled = false, children, ...props }: ButtonProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    return (
      <StyledButton ref={ref} disabled={Boolean(disabled)} {...props}>
        {isLoading ? 'Loading...' : children}
      </StyledButton>
    )
  },
)

Button.displayName = 'Button'

export default Button
