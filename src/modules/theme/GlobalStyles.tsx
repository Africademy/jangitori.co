import { css, Global } from '@emotion/react'

import { pseudo } from '@/ui/utils/pseudo'

import { colors } from './colors'
import { overrides } from './overrides'
import { typography } from './typography'
import { utilities } from './utilities'
import { cssVariables } from './variables'

const globalStyles = css`
  ${cssVariables}
  ${utilities}
  ${overrides}

  
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

  html,
  body {
    padding: 0;
    margin: 0;
  }

  html {
    font-size: 16px;
    height: 100vh;
    width: 100vw;
  }

  body.ijan {
    height: 100%;
    width: 100%;
    font-family: ${typography.fonts.body};
    font-weight: ${typography.fontWeights.normal};
    line-height: ${typography.lineHeights.none};
    color: ${colors.gray[900]};
    background: #fff;
  }

  #__next {
    height: 100%;
    width: 100%;
    overflow: auto;
    padding: 0;
    margin: 0;
    position: relative;
    background-color: ${colors.gray[50]};
  }

  #map {
    height: 100%;
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

  p {
    line-height: ${typography.lineHeights.none};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${typography.fonts.heading};
    font-weight: ${typography.fontWeights.medium};
    line-height: ${typography.lineHeights.heading};
  }

  .stat > dl {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`

export default function GlobalStyles() {
  return <Global styles={globalStyles} />
}
