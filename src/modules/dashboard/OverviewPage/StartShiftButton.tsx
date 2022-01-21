import { Button } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'

import { InitialTimeClockCopy } from './TimeClockCopy'

export const StartShiftButton = () => {
  const theme = useTheme()

  const handleClick = () => {
    console.log('clicked Start shift button')
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
      {InitialTimeClockCopy.StartShift}
    </Button>
  )
}
