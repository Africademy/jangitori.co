import { Skeleton, VStack } from '@chakra-ui/react'
import times from 'lodash.times'

export const LoadingVStack = ({ numRows = 5 }: { numRows?: number }) => {
  return (
    <VStack minW="100%">
      {times(numRows, (i) => i).map((row) => (
        <Skeleton key={row} height="1.25rem" />
      ))}
    </VStack>
  )
}
