import { useEffect, useState } from 'react'

import {
  getGeoLocation,
  GetGeoLocationResult,
  GetGeoOptions,
  isGetGeoError,
} from './getGeoLocation'

const defaultGeoLocationOptions = {
  enableHighAccuracy: false,
  maximumAge: 0,
  timeout: Number.POSITIVE_INFINITY,
  when: true,
}

export function useGeoLocation(
  geoLocationOptions: GetGeoOptions = defaultGeoLocationOptions,
): GetGeoLocationResult | null {
  const [geoObject, setGeoObject] = useState<GetGeoLocationResult | null>(null)
  const { when, enableHighAccuracy, timeout, maximumAge } = geoLocationOptions

  useEffect(() => {
    async function getGeoCode() {
      try {
        const value = await getGeoLocation({
          enableHighAccuracy,
          maximumAge,
          timeout,
          when,
        })
        setGeoObject(value)
      } catch (error) {
        isGetGeoError(error) && setGeoObject(error)
      }
    }
    if (when) {
      getGeoCode()
    }
  }, [when, enableHighAccuracy, timeout, maximumAge])

  return geoObject
}
