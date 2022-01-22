import { makeAutoObservable } from 'mobx'
import invariant from 'tiny-invariant'

import { Coordinates } from './Coordinates'

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}

export class LocationStore {
  geolocationPosition: GeolocationPosition | null = null

  setGeolocationPosition(value: GeolocationPosition | null) {
    this.geolocationPosition = value
  }

  get invariantCoords(): Coordinates {
    const geolocationPosition = this.geolocationPosition
    invariant(geolocationPosition, '🟠  GeolocationPosition was null.')
    return geolocationPosition.coords
  }

  /**
   * Should be called in the browser otherwise we won't have access to
   * the Geolocation API.
   */
  hydrate() {
    console.log('🌊 Hydrating LocationStore...')
    const currentCoords = this.geolocationPosition?.coords
    if (currentCoords) return

    if (!navigator || !('geolocation' in navigator)) return

    navigator.geolocation.watchPosition(
      (position) => {
        this.setGeolocationPosition(position)
      },
      (error) => {
        console.log('Failed to get current position: ', error)
      },
      options,
    )
  }

  streamGeoChanges() {
    if (!navigator || !('geolocation' in navigator)) return

    const currentCoords = this.geolocationPosition?.coords

    navigator.geolocation.watchPosition(
      (position) => {
        if (!currentCoords) return this.setGeolocationPosition(position)

        const newCoords = position.coords
        if (
          newCoords.latitude === currentCoords.latitude &&
          newCoords.longitude === currentCoords.longitude
        )
          return

        this.setGeolocationPosition(position)
      },
      (error) => {
        console.log('Failed to get current position: ', error)
      },
      options,
    )
  }

  constructor() {
    makeAutoObservable(this)
  }
}
