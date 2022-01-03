import { extendTheme } from '@chakra-ui/react'

import { colors } from './colors'
import { radii } from './radii'
import { shadows } from './shadows'
import { typography } from './typography'

export const theme = extendTheme({
  colors,
  ...typography,
  shadows,
  radii,
})

/**
 * Merge with my theme types
 */
export type Theme = typeof theme
