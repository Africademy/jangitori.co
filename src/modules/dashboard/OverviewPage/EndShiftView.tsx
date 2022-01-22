import { VStack } from '@chakra-ui/react'

import { EndShiftButton } from './EndShiftButton'

export const EndShiftView = () => {
  return (
    <>
      <ShiftWorkTime />
      <VStack w="100%" gap={3}>
        <EndShiftButton />
      </VStack>
    </>
  )
}

import { Box, Flex } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'

import { CurrentLocation } from '@/modules/emotion/CurrentLocation'

import { EndShiftCopy } from './TimeClockCopy'

export const ShiftWorkTime = () => {
  const theme = useTheme()

  return (
    <>
      <VStack
        shadow={theme.shadows.md}
        borderRadius={theme.radii.lg}
        bg={'#fff'}
        py={3}
        w="90%"
        mx="auto"
        mt={5}
      >
        <Flex direction="column" w="100%" textAlign="center" align="center">
          <Flex align="center" gap={2}>
            <Box>{EndShiftCopy.WorkTime}</Box>
          </Flex>
          <Box fontWeight="semibold" fontSize="5xl">
            {'01:45:00'}
          </Box>
        </Flex>
        <Flex
          align="center"
          w="100%"
          gap={2}
          borderTop={`1px solid ${theme.colors.gray[200]}`}
          pt={2}
          fontSize="sm"
          px={5}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[1.25em] w-[1.25em]"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>

          <Flex align="center" gap={1}>
            <>{EndShiftCopy.ClockInLocation}</> <CurrentLocation />
          </Flex>
        </Flex>
      </VStack>
      <Flex
        w="90%"
        mx="auto"
        py={4}
        fontSize="sm"
        px={5}
        justify="space-between"
        align="center"
      >
        <Box lineHeight={1}>Total hours for today</Box>
        <Box fontWeight="semibold" lineHeight={1}>
          {'01:45:00'}
        </Box>
      </Flex>
    </>
  )
}
