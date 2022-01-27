import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { CurrentLocation } from '@/modules/geolocation/CurrentLocation'

import { ShiftToggleButton } from './ShiftToggleButton'
import { EndShiftCopy } from './TimeClockCopy'

export const EndShift = () => {
  const router = useRouter()

  return (
    <div className="layout flex flex-col gap-5 py-5">
      <ShiftWorkTime />
      <ShiftToggleButton
        onEndShift={() => router.push('/dashboard/employee/overview')}
      />
    </div>
  )
}

export const ShiftWorkTime = () => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-2 items-center text-center py-5">
          <Box>{EndShiftCopy.WorkTime}</Box>
          <Box fontWeight="semibold" fontSize="5xl">
            {'01:45:00'}
          </Box>
        </div>
        <div className="flex items-center gap-2 py-2 border-t border-gray-200 px-3">
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

          <div className="flex items-center gap-1">
            <span>{EndShiftCopy.ClockInLocation}</span>
            <CurrentLocation />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Box>Total hours for today</Box>
        <Box fontWeight="semibold">{'01:45:00'}</Box>
      </div>
    </>
  )
}
