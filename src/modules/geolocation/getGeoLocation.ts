import { defaultGeoLocationOptions } from './defaultGeoLocationOptions'
import { GetGeoLocationOptions, GetGeoLocationResult } from './types'

export function getGeoLocation(
  options: GetGeoLocationOptions = defaultGeoLocationOptions,
): Promise<GetGeoLocationResult> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          resolve({
            isError: false,
            message: '',
            ...position,
          })
        },
        (error) => {
          reject({ isError: true, message: error.message })
        },
        options,
      )
    } else {
      reject({
        isError: true,
        message: 'Geolocation is not supported for this Browser/OS.',
      })
    }
  })
}
