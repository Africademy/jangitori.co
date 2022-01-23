import { observer } from 'mobx-react-lite'

import { useLocationStore } from '@/modules/stores'

export const CurrentLocation = observer(function CurrentCoords() {
  const locationStore = useLocationStore()

  return (
    <>
      {locationStore.coords && (
        <p>{`(${locationStore.coords.latitude}, ${locationStore.coords.longitude})`}</p>
      )}
    </>
  )
})
