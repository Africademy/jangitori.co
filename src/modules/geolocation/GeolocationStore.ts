import { computed, makeAutoObservable } from 'mobx'

import { isProduction } from '@/lib/environment'

import { Coordinates } from './Coordinates'

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}

export class GeolocationStore {
  geolocationPosition: GeolocationPosition | null = null

  updatedAt: Date | null = null

  setGeolocationPosition(value: GeolocationPosition | null) {
    this.geolocationPosition = value
    this.updatedAt = new Date()
  }

  get coordinates(): Coordinates | null {
    const geolocationPosition = this.geolocationPosition
    if (!geolocationPosition) {
      console.warn('Could not get coordinates, GeolocationPosition was null.')
      return null
    }

    !isProduction() &&
      console.log('Got coordinates: ', geolocationPosition.coords)

    return geolocationPosition.coords
  }

  getCoordinatesOrThrow = () =>
    computed((): Coordinates => {
      const geolocationPosition = this.geolocationPosition
      if (!geolocationPosition) {
        throw new Error(
          'Could not get coordinates, GeolocationPosition was null.',
        )
      }

      !isProduction() &&
        console.log('Got coordinates: ', geolocationPosition.coords)

      return geolocationPosition.coords
    }).get()

  get isReady(): boolean {
    return Boolean(this.geolocationPosition)
  }

  constructor() {
    makeAutoObservable(this)

    this.syncPosition()
  }

  private syncPosition() {
    if (typeof navigator === 'undefined') return

    navigator.geolocation.watchPosition(
      (position) => {
        const coords = position.coords
        const currentCoords = this.coordinates
        if (!currentCoords) return this.setGeolocationPosition(position)

        if (
          coords.latitude === currentCoords.latitude &&
          coords.longitude === currentCoords.longitude
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
}
