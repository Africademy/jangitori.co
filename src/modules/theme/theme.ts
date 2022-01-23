import { extendTheme } from '@chakra-ui/react'

import { colors } from './colors'
import { radii } from './radii'
import { shadows } from './shadows'
import { space } from './space'
import { typography } from './typography'

const components = {}

const myTheme = {
  colors,
  ...typography,
  shadows,
  radii,
  components,
  space,
}

export const theme = extendTheme(myTheme)

export type Theme = typeof theme
