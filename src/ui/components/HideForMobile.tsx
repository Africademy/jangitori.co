import { isMobile } from '../utils/isMobile'

export const HideForMobile = ({ children }) => {
  if (isMobile()) return null

  return <>{children}</>
}

export const MobileOnly = ({ children }) => {
  if (!isMobile()) return null

  return <>{children}</>
}
