import { rem } from '@/ui/utils/spacing'

export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1280,
  '2xl': 1536,
  mobile: 480,
  tablet: 768,
  desktop: 992,
} as const

export const breakpointNames = [
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  'mobile',
  'tablet',
  'desktop',
] as const

export const breakpointPxScale = [0, 480, 768, 992, 1280, 1536]

export const breakpointRemScale = breakpointPxScale.map(rem)

export type BreakpointName = typeof breakpointNames[number]
