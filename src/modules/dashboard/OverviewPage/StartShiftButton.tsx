import { Button } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { observer } from 'mobx-react-lite'

import { useLocationStore, useShiftStore } from '@/modules/stores'

import { InitialTimeClockCopy } from './TimeClockCopy'

export const StartShiftButton = observer(function StartShiftButton() {
  const shiftStore = useShiftStore()
  const locationStore = useLocationStore()

  const theme = useTheme()

  const handleClick = () => {
    shiftStore.startShift(locationStore.invariantCoords)
  }

  return (
    <Button
      isLoading={shiftStore.request.isLoading}
      w="100%"
      py={6}
      // disabled={isBusy || isDisabled}
      bg={theme.colors.indigo[600]}
      color={'#fff'}
      size="md"
      onClick={handleClick}
      _disabled={{
        background: theme.colors.gray[200],
        color: theme.colors.gray[500],
      }}
      _hover={{
        _notDisabled: {
          background: theme.colors.indigo[700],
        },
      }}
    >
      {InitialTimeClockCopy.StartShift}
    </Button>
  )
})
