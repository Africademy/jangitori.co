import { environment } from '@configs/environment'
import styled from '@emotion/styled'
import GoogleMapReact from 'google-map-react'
import React from 'react'

const AnyReactComponent = ({
  text,
}: {
  text: string
  lat: number
  lng: number
}) => <div>{text}</div>

class MapComponent extends React.Component<{
  center: { lat: number; lng: number }
  zoom: number
}> {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  }

  render() {
    return (
      <StyledMap>
        <GoogleMapReact
          bootstrapURLKeys={{ key: environment.googleMaps.apiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </StyledMap>
    )
  }
}

const StyledMap = styled.div`
  #google-map {
    width: 100%;
    height: 100vh;
  }
`

export default MapComponent
