import { BreakpointName, breakpointRemScale } from '@/modules/theme/breakpoints'

export const minWidths: { [k in BreakpointName]: string } = {
  sm: breakpointRemScale[0],
  md: breakpointRemScale[1],
  lg: breakpointRemScale[2],
  xl: breakpointRemScale[3],
  '2xl': breakpointRemScale[4],
  mobile: breakpointRemScale[0],
  tablet: breakpointRemScale[1],
  desktop: breakpointRemScale[2],
}
export const maxWidths: { [k in BreakpointName]: string } = {
  sm: breakpointRemScale[1],
  md: breakpointRemScale[2],
  lg: breakpointRemScale[3],
  xl: breakpointRemScale[4],
  '2xl': breakpointRemScale[5],
  mobile: breakpointRemScale[1],
  tablet: breakpointRemScale[2],
  desktop: breakpointRemScale[3],
}

export function below(bp: BreakpointName) {
  return `@media screen and (max-width: ${maxWidths[bp]})`
}

const nextIndex = {
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  '2xl': 5,
  mobile: 1,
  tablet: 2,
  desktop: 3,
}

export function above(bp: BreakpointName) {
  if (bp === '2xl' || bp === 'desktop') {
    return `@media screen and (min-width: ${minWidths[bp]})`
  }

  return `@media screen and (min-width: ${breakpointRemScale[nextIndex[bp]]})`
}

export function only(bp: BreakpointName) {
  return `@media screen and (min-width: ${minWidths[bp]}) and (max-width: ${maxWidths[bp]})`
}
