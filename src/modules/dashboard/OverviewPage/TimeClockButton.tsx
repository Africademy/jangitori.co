import { Button } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import React from 'react'

import { useLocationStore, useShiftStore } from '@/modules/stores'

export interface TimeClockButtonProps {
  isClockIn: boolean
}

export const TimeClockButton = ({ isClockIn }: TimeClockButtonProps) => {
  const theme = useTheme()
  const shiftStore = useShiftStore()
  const locationStore = useLocationStore()

  const handleClick = () => {
    if (isClockIn) {
      return shiftStore.startShift(locationStore.invariantCoords)
    }
    shiftStore.endShift(locationStore.invariantCoords)
  }

  return (
    <Button
      isLoading={shiftStore.request.isLoading}
      loadingText={isClockIn ? 'Starting...' : 'Ending...'}
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
      {isClockIn ? 'Start Shift' : 'End Shift'}
    </Button>
  )
}
