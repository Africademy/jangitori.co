import { Button } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { useLocationStore, useShiftStore } from '@/modules/stores'

export interface TimeClockButtonProps {
  onEndShift?: () => void
}

export const TimeClockButton = observer(function TimeClockButton({
  onEndShift,
}: TimeClockButtonProps) {
  const theme = useTheme()
  const shiftStore = useShiftStore()
  const locationStore = useLocationStore()

  const isClockIn = !Boolean(onEndShift)

  const handleClick = async () => {
    if (isClockIn) return shiftStore.startShift(locationStore.invariantCoords)

    const res = await shiftStore.endShift(locationStore.invariantCoords)
    if (onEndShift) {
      res && onEndShift()
    }
  }

  return (
    <Button
      busy={shiftStore.request.busy}
      loadingText={isClockIn ? 'Starting...' : 'Ending...'}
      w="100%"
      py={6}
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
})
