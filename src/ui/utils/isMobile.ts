import { isBrowser } from '@/lib/environment'

export const isMobile = (): boolean => {
  if (isBrowser()) {
    try {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    } catch (error) {
      console.log(error)

      return false
    }
  } else {
    return false
  }
}
