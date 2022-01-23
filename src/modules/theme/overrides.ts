import { css } from '@emotion/react'

const overrideAutofillStyles = css`
  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-box-shadow: unset !important;
    -webkit-text-fill-color: unset !important;
  }

  input:-internal-autofill-selected {
    background-color: unset !important;
    color: unset !important;
  }

  &:focus-visible {
    outline: unset !important;
  }

  input[type='email']:focus {
    outline: unset !important;
    outline-offset: unset !important;
    box-shadow: unset !important;
  }
`

const overrideScrollbarStyles = css`
  ::-webkit-scrollbar {
    width: 0.5rem;
    background-color: transparent;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`

export const overrides = css`
  ${overrideAutofillStyles}
  ${overrideScrollbarStyles}
`
