import { useEffect, useState } from 'react'

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

  return { geolocationPosition }
}
