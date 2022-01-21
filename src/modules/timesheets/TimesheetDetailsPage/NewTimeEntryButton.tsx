import { Button, Flex } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { shouldClockIn } from '@/lib/shouldClockIn'
import { TimeEntry } from '@/modules/models/TimeEntry'
import { Timesheet } from '@/modules/models/Timesheet'
import { useRootStore, useServices } from '@/modules/stores'
import { isAddTimeEntryAllowed } from '@/modules/time-entries/isAddTimeEntryAllowed'
import { Typography } from '@/ui/atoms/Typography'

import { useTimesheetDetails } from './useTimesheetDetails'

export const NewTimeEntryButtonComponent = ({
  timesheetId,
  isClockIn,
  isDisabled,
  onSuccess,
  wide = false,
}) => {
  const services = useServices('timeEntry')
  const { geolocationStore } = useRootStore()

  const [isBusy, setIsBusy] = useState(false)
  const theme = useTheme()

  const createNewEntry = async () => {
    setIsBusy(true)
    try {
      const location = geolocationStore.getCoordinatesOrThrow()
      const newEntry = await services.timeEntry.createEntry({
        timesheet: timesheetId,
        location,
      })

      onSuccess(newEntry)
    } catch (error) {
      alert((error as Error).message)
    } finally {
      setIsBusy(false)
    }
  }

  const handleNewTimeEntry = () => {
    const task = createNewEntry()

    toast.promise(task, {
      loading: `${isClockIn ? 'Clocking in' : 'Clocking out'}`,
      success: () => {
        return `Successfully ${isClockIn ? 'clocked in' : 'clocked out'}`
      },
      error: (error) => {
        console.warn('Failed to create index: ', error.message)
        return `Failed to ${isClockIn ? 'clock in' : 'clock out'}`
      },
    })
  }

  return (
    <>
      {isDisabled && (
        <Flex
          align="center"
          gap={2}
          bg={theme.colors.blue[50]}
          px={3}
          py={2}
          {...(wide ? { width: '100%' } : {})}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <Typography fontSize="sm" color={theme.colors.blue[700]}>
            Must wait at least 15 minutes between entries.
          </Typography>
        </Flex>
      )}
      <Button
        disabled={isBusy || isDisabled}
        variant="solid"
        bg={theme.colors.indigo[600]}
        color={'#fff'}
        size="md"
        {...(!wide ? {} : { minW: '100%' })}
        px={6}
        onClick={handleNewTimeEntry}
        _disabled={{
          background: theme.colors.gray[200],
          color: theme.colors.gray[500],
        }}
        _hover={{
          _notDisabled: {
            background: theme.colors.primary[700],
          },
        }}
      >
        {isBusy ? '...' : isClockIn ? 'Clock in' : 'Clock out'}
      </Button>
    </>
  )
}

export function useGetNewTimeEntryButtonProps({
  timesheetId,
  timeEntriesData,
}) {
  const { timeEntries } = useTimesheetDetails(timesheetId)

  const isClockIn = shouldClockIn(timeEntriesData)

  const getNewTimeEntryButtonProps = () => ({
    timesheetId,
    isClockIn,
    isDisabled: !isAddTimeEntryAllowed(timeEntriesData),
    onSuccess: () => {
      timeEntries.mutate()
    },
  })

  return getNewTimeEntryButtonProps
}

export const NewTimeEntryButton = ({
  timesheetData,
  timeEntriesData,
  wide = false,
}: {
  timesheetData: Timesheet
  timeEntriesData: TimeEntry[]
  wide?: boolean
}) => {
  const getNewTimeEntryButtonProps = useGetNewTimeEntryButtonProps({
    timesheetId: timesheetData.id,
    timeEntriesData,
  })

  return (
    <NewTimeEntryButtonComponent
      wide={wide}
      {...getNewTimeEntryButtonProps()}
    />
  )
}
