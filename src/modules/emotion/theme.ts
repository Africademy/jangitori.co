import { extendTheme } from '@chakra-ui/react'

import { colors } from './colors'
import { radii } from './radii'
import { shadows } from './shadows'
import { typography } from './typography'

const myTheme = {
  colors,
  ...typography,
  shadows,
  radii,
}

/**
 * Merge with my theme types
 */
export type MyTheme = typeof myTheme

export const theme = extendTheme(myTheme)

export type Theme = typeof theme
