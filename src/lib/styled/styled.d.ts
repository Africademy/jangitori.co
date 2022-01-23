/* eslint-disable @typescript-eslint/no-empty-interface */
import { SystemProps } from '@chakra-ui/react'
import { Interpolation } from '@emotion/react'
import {} from '@emotion/react/types/css-prop' // See https://github.com/emotion-js/emotion/pull/1941

import { Theme as AppTheme } from '@/modules/theme/theme'

import { Styling } from './types'

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}

declare module 'react' {
  interface Attributes extends SystemProps {
    styles?: Styling
    css?: Interpolation<AppTheme>
  }
}
