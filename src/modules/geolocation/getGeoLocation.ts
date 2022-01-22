export interface GetGeoLocationResult extends GeolocationPosition {
  isError: boolean
  message: string
}

export interface GetGeoErrorResult extends GetGeoLocationResult {
  isError: true
}

export function isGetGeoError(o: any): o is GetGeoErrorResult {
  return (
    typeof o === 'object' &&
    'isError' in o &&
    typeof o.isError === 'boolean' &&
    o.isError &&
    'message' in o &&
    typeof o.message === 'string'
  )
}

export type GetGeoOptions = {
  enableHighAccuracy?: boolean
  timeout?: number
  maximumAge?: number
  when?: boolean
}

export function getGeoLocation(
  options: GetGeoOptions,
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
