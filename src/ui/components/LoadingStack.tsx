import { Skeleton, Stack } from '@chakra-ui/react'

const LoadingStack = () => {
  return (
    <Stack>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  )
}

export default LoadingStack
