import { isProduction } from '@/lib/environment'

import { Coordinates } from './Coordinates'

export const getCoordinates = (
  geolocationPosition: GeolocationPosition | Falsy,
): Coordinates => {
  if (!geolocationPosition)
    throw new Error('Could not get coordinates, GeolocationPosition was null.')

  const { latitude, longitude } = geolocationPosition.coords

  !isProduction() && console.log('Got coordinates: ', { latitude, longitude })

  return { latitude, longitude }
}
