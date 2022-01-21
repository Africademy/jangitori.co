import { Button, Tooltip } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { useRootStore, useServices } from '@/modules/stores'
import { QuestionIcon } from '@/ui/icons'
import { pseudo } from '@/ui/utils/pseudo'

import { useTimesheetDetails } from './useTimesheetDetails'

export const NewTimeEntryButton = ({
  timesheetId,
  isClockIn,
  isDisabled,
  onSuccess,
  updateTimesheet,
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

      const lastEntry = timeEntries.data?.at(-1)
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
      success: (index) => {
        return `Successfully ${isClockIn ? 'clocked in' : 'clocked out'}`
      },
      error: (error) => {
        console.warn('Failed to create index: ', error.message)
        return `Failed to ${isClockIn ? 'clock in' : 'clock out'}`
      },
    })
  }

  return (
    <div className="flex items-center gap-3">
      {!isDisabled && (
        <Tooltip
          label="You must wait at least 15 minutes between time punches."
          fontSize="md"
        >
          <IconBox>
            <QuestionIcon />
          </IconBox>
        </Tooltip>
      )}
      <Button
        disabled={isBusy || isDisabled}
        variant="solid"
        colorScheme="blue"
        size="md"
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
    </div>
  )
}

const IconBox = styled.div`
  font-size: 1rem;
  ${({ theme }) =>
    css`
      color: ${theme.colors.gray[500]};
      ${pseudo('_hover')} {
        color: ${theme.colors.gray[800]};
      }
    `}

  svg {
    height: 0.75rem;
    width: 0.75rem;
  }
`
