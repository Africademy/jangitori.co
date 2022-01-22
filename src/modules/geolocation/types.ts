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
