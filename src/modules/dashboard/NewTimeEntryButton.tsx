import { Button } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { shouldClockIn } from '@/lib/shouldClockIn'
import { useRootStore, useServices } from '@/modules/stores'

import { TimeEntry } from '../models/TimeEntry'
import { Timesheet } from '../models/Timesheet'
import { isAddTimeEntryAllowed } from '../time-entries/isAddTimeEntryAllowed'
import { useTimesheetDetails } from './useTimesheetDetails'

export const NewTimeEntryButtonComponent = ({
  timesheetId,
  isClockIn,
  isDisabled,
  onSuccess,
  updateTimesheet,
  wide = false,
}) => {
  const services = useServices('timeEntry')
  const { timeEntries } = useTimesheetDetails(timesheetId)
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

      const timeEntriesData = timeEntries.data
      const lastEntry =
        timeEntriesData && timeEntriesData.length
          ? timeEntriesData[timeEntriesData.length - 1]
          : null
      if (!isClockIn || !lastEntry) return onSuccess(newEntry)

      await updateTimesheet({
        id: timesheetId,
        hours: parseFloat(
          (
            differenceInMinutes(
              new Date(newEntry.timestamp),
              new Date(lastEntry.timestamp),
            ) / 60
          ).toFixed(2),
        ),
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
  )
}

export function useGetNewTimeEntryButtonProps({
  timesheetId,
  timeEntriesData,
}) {
  const services = useServices('timeEntry', 'timesheet')

  const { timesheet, timeEntries } = useTimesheetDetails(timesheetId)

  const isClockIn = shouldClockIn(timeEntriesData)

  const getNewTimeEntryButtonProps = () => ({
    timesheetId,
    isClockIn,
    isDisabled: !isAddTimeEntryAllowed(timeEntriesData),
    updateTimesheet: (updateData: Partial<Timesheet>) => {
      services.timesheet.updateTimesheet({
        id: timesheetId,
        ...updateData,
      })
    },
    onSuccess: () => {
      timeEntries.mutate()
      timesheet.mutate()
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
