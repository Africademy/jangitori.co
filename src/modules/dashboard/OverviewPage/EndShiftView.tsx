import { VStack } from '@chakra-ui/react'

import { EndShiftButton } from './EndShiftButton'
import { HoursToday } from './HoursToday'

export const EndShiftView = () => {
  return (
    <>
      <HoursToday />
      <VStack w="100%" gap={3}>
        <EndShiftButton />
      </VStack>
    </>
  )
}
