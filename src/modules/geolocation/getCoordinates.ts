import { isProduction } from '@/lib/environment'

import { Coordinates } from './Coordinates'

export const getCoordinates = (
  geolocationPosition: GeolocationPosition | Falsy,
): Coordinates | null => {
  if (!geolocationPosition) {
    console.warn('Could not get coordinates, GeolocationPosition was null.')
    return null
  }
  const { latitude, longitude } = geolocationPosition.coords

  !isProduction() && console.log('Got coordinates: ', { latitude, longitude })

  return { latitude, longitude }
}
