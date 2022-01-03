import { ComponentType, PropsWithChildren } from 'react'

export type ParentComponentProps<P = {}> = PropsWithChildren<P>

export type IComponent<P = {}> = ComponentType<ParentComponentProps<P>>

export type ICompositionComponent<K extends string = string> = IComponent & {
  [k in K]: IComponent
}
