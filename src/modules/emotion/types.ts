import { SerializedStyles, Theme } from '@emotion/react'

export type Styling =
  | SerializedStyles
  | [SerializedStyles, ...SerializedStyles[]]

export type StyledProps<P extends {} = {}> = {
  theme: Theme
} & P
