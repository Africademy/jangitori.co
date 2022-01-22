import { useEffect, useState } from 'react'

export const defaultGeoLocationOptions = {
  enableHighAccuracy: false,
  maximumAge: 0,
  timeout: Number.POSITIVE_INFINITY,
  when: true,
}

export interface GetGeoLocationResult extends GeolocationPosition {
  isError: boolean
  message: string
}

export interface GetGeoErrorResult extends GetGeoLocationResult {
  isError: true
}

export type GetGeoLocationOptions = {
  enableHighAccuracy?: boolean
  timeout?: number
  maximumAge?: number
  when?: boolean
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

export function useGeoLocation(
  geoLocationOptions: GetGeoLocationOptions = defaultGeoLocationOptions,
): GetGeoLocationResult | null {
  const [geoObject, setGeoObject] = useState<GetGeoLocationResult | null>(null)
  const { when, enableHighAccuracy, timeout, maximumAge } = geoLocationOptions

  useEffect(() => {
    async function fetchGeo() {
      try {
        const value = await getGeoLocation({
          when,
          enableHighAccuracy,
          timeout,
          maximumAge,
        })
        setGeoObject(value)
      } catch (error) {
        isGetGeoError(error) && setGeoObject(error)
      }
    }
    if (when) {
      fetchGeo()
    }
  }, [when, enableHighAccuracy, timeout, maximumAge])

  return geoObject
}
