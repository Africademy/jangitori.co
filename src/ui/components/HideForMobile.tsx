import { isBrowser } from '@/lib/environment'

const isMobile = (): boolean => {
  if (isBrowser()) {
    try {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    } catch (e) {
      console.log(e)

      return false
    }
  } else {
    return false
  }
}

export const HideForMobile = ({ children }) => {
  if (isMobile()) return null

  return <>{children}</>
}
