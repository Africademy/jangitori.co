import { Box } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { isProduction } from '@/lib/environment'
import { useLocationStore } from '@/modules/stores'

export const CurrentCoords = observer(function CurrentCoords() {
  const locationStore = useLocationStore()

  return (
    <Box px={5} py={3}>
      {!isProduction() && locationStore.coords && (
        <p>{`Current location: (${locationStore.coords.latitude}, ${locationStore.coords.longitude})`}</p>
      )}
    </Box>
  )
})
