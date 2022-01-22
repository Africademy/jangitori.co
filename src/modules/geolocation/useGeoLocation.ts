import { useEffect, useState } from 'react'

import { defaultGeoLocationOptions } from './defaultGeoLocationOptions'
import { getGeoLocation } from './getGeoLocation'
import {
  GetGeoLocationOptions,
  GetGeoLocationResult,
  isGetGeoError,
} from './types'

export function useGeoLocation(
  geoLocationOptions: GetGeoLocationOptions = defaultGeoLocationOptions,
): GetGeoLocationResult | null {
  const [geoObject, setGeoObject] = useState<GetGeoLocationResult | null>(null)
  const { when, enableHighAccuracy, timeout, maximumAge } = geoLocationOptions

  useEffect(() => {
    async function getGeoCode() {
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
      getGeoCode()
    }
  }, [when, enableHighAccuracy, timeout, maximumAge])

  return geoObject
}
