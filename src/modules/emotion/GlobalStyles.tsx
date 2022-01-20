import { css, Global } from '@emotion/react'

import { pseudo } from '@/ui/utils/pseudo'

import { colors } from './colors'
import { typography } from './typography'
import { utilities } from './utilities'
import { cssVariables } from './variables'

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

const globalStyles = css`
  ${cssVariables}
  ${utilities}
  ${overrideScrollbarStyles}
  ${overrideAutofillStyles}
  
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
  }

  * {
    transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  html {
    font-size: 16px;
  }

  html,
  body {
    padding: 0;
    margin: 0;
  }

  html {
    height: 100vh;
    background-color: ${colors.gray[50]};
  }

  #__next {
    min-height: 100vh;
    min-width: 100vw !important;
    overflow: auto;
    padding: 0;
    margin: 0;
    position: relative;
    background-color: ${colors.gray[50]};
  }

  li {
    list-style-type: none;
  }

  a {
    text-decoration: none;
  }

  // ----------- Button styles ------------------
  button {
    cursor: pointer;

    ${pseudo('_disabled')} {
      cursor: default !important;
    }
  }

  // Apply active font to all elements

  body.ijan {
    height: 100%;
    font-family: ${typography.fonts.body};
    font-weight: ${typography.fontWeights.normal};
    line-height: ${typography.lineHeights.base};
    color: ${colors.gray[800]};
    background: ${colors.gray[50]};
    transition-property: background-color;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${typography.fonts.heading};
    font-weight: ${typography.fontWeights.medium};
    line-height: ${typography.lineHeights.shorter};
  }
`

export default function GlobalStyles() {
  return <Global styles={globalStyles} />
}
