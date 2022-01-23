import { SystemProps } from '@chakra-ui/react'
import { SerializedStyles, Theme } from '@emotion/react'

import { GapProps } from '@/ui/utils/spacing'

export type Styling =
  | SerializedStyles
  | [SerializedStyles, ...SerializedStyles[]]

export type StyledProps<P extends {} = {}> = {
  theme: Theme
} & P

export type StyledSystemProps = SystemProps & GapProps
