import { environment } from '@configs/environment'
import { GoogleApiWrapper, IProvidedProps } from 'google-maps-react'
import React from 'react'

export type PropsWithGoogleMaps = IProvidedProps

const withGoogleMaps = (
  Component: React.ComponentType<PropsWithGoogleMaps>,
) => {
  return GoogleApiWrapper({ apiKey: environment.googleMaps.apiKey })(Component)
}

const GoogleMapsContext = React.createContext<PropsWithGoogleMaps | undefined>(
  undefined,
)

const GoogleMapsProviderComponent: React.FC<PropsWithGoogleMaps> = ({
  children,
  google,
}) => {
  return (
    <GoogleMapsContext.Provider value={{ google }}>
      {children}
    </GoogleMapsContext.Provider>
  )
}

const GoogleMapsProvider = withGoogleMaps(GoogleMapsProviderComponent)

export default GoogleMapsProvider
