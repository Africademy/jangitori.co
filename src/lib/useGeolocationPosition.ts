import { useEffect, useState } from 'react'

import { isProduction } from './environment'

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}

export const useGeolocationPosition = () => {
  const [geolocationPosition, setGeolocationPosition] =
    useState<GeolocationPosition | null>(null)

  useEffect(() => {
    let watchNumber: number | null = null

    watchNumber = navigator.geolocation.watchPosition(
      (position) => {
        setGeolocationPosition(position)
      },
      (error) => {
        console.log('Failed to get current position: ', error)
      },
      options,
    )
    return () => {
      watchNumber && navigator.geolocation.clearWatch(watchNumber)
    }
  }, [])

  const getCoordinates = (): { latitude: any; longitude: any } => {
    if (!geolocationPosition)
      throw new Error(
        'Could not get coordinates for GeolocationPosition because it is null',
      )

    const { latitude, longitude } = geolocationPosition.coords

    !isProduction() && console.log('Got coordinates: ', { latitude, longitude })

    return { latitude, longitude }
  }

  return { geolocationPosition, getCoordinates }
}
