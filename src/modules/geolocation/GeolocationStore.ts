import { autorun, makeAutoObservable } from 'mobx'

import { Coordinates } from './Coordinates'
import { getCoordinates } from './getCoordinates'

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

  get coordinates(): Coordinates {
    const geolocationPosition = this.geolocationPosition
    return getCoordinates(geolocationPosition)
  }

  constructor() {
    makeAutoObservable(this)

    this.syncPosition()
  }

  private syncPosition() {
    if (typeof navigator === 'undefined') return

    autorun(() => {
      navigator.geolocation.watchPosition(
        (position) => {
          this.setGeolocationPosition(position)
        },
        (error) => {
          console.log('Failed to get current position: ', error)
        },
        options,
      )
    })
  }
}
