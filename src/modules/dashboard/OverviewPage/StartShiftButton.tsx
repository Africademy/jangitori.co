import { Button } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { observer } from 'mobx-react-lite'

import { useLocationStore, useShiftsStore } from '@/modules/stores'

import { InitialTimeClockCopy } from './TimeClockCopy'

export const StartShiftButton = observer(function StartShiftButton() {
  const shiftsStore = useShiftsStore()
  const locationStore = useLocationStore()

  const theme = useTheme()

  const handleClick = () => {
    shiftsStore.startShift(locationStore.invariantCoords)
  }

  return (
    <Button
      w="100%"
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
      {shiftsStore.request.isLoading
        ? 'Starting...'
        : InitialTimeClockCopy.StartShift}
    </Button>
  )
})
