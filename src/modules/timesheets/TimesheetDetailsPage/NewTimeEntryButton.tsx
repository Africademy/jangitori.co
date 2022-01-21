import { Button, Flex, VStack } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { shouldClockIn } from '@/lib/shouldClockIn'
import { TimeEntry } from '@/modules/models/TimeEntry'
import { Timesheet } from '@/modules/models/Timesheet'
import { usePayPeriodEnd } from '@/modules/payrolls/usePayPeriodEnd'
import { useRootStore, useServices } from '@/modules/stores'
import { isAddTimeEntryAllowed } from '@/modules/time-entries/isAddTimeEntryAllowed'
import { Typography } from '@/ui/atoms/Typography'
import { QuestionIcon } from '@/ui/icons/QuestionIcon'

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
    <VStack align="stretch" gap={2}>
      {isDisabled && <DisabledStateExplanation />}
      <Flex align="center" gap={3}>
        <Button
          display="flex"
          align="center"
          gap={2}
          px={5}
          disabled={isBusy || isDisabled}
          variant="solid"
          fontWeight="medium"
          bg={theme.colors.indigo[600]}
          color={'#fff'}
          size="md"
          {...(!wide ? {} : { minW: '100%' })}
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
          {/* <ClockIcon /> */}
          {isBusy ? '...' : isClockIn ? 'Clock in' : 'Clock out'}
        </Button>
      </Flex>
    </VStack>
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
  const payPeriodEnd = usePayPeriodEnd()
  const employee = useRootStore().authStore.account?.uid ?? ''
  const { timeEntries } = useTimesheetDetails({ employee, payPeriodEnd })

  const isClockIn = shouldClockIn(timeEntriesData)

  const getNewTimeEntryButtonProps = () => ({
    timesheetId: timesheetData.id,
    isClockIn,
    isDisabled: !isAddTimeEntryAllowed(timeEntriesData),
    onSuccess: () => {
      timeEntries.mutate()
    },
  })

  return (
    <NewTimeEntryButtonComponent
      wide={wide}
      {...getNewTimeEntryButtonProps()}
    />
  )
}

export const DisabledStateExplanation = () => {
  const theme = useTheme()

  return (
    <Flex align="center" gap={1.5} pt={3} py={1}>
      <QuestionIcon className="h-4 w-4 text-blue-500 opacity-[0.7]" />
      <Typography fontSize="sm" color={theme.colors.blue[700]} lineHeight={1}>
        Must wait at least 15 minutes between entries.
      </Typography>
    </Flex>
  )
}
