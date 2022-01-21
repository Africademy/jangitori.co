import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import format from 'date-fns/format'
import React, { useMemo } from 'react'

import { TimeEntry } from '@/modules/models/TimeEntry'

import { buildTimesheetDetailsRows } from './buildTimesheetDetailsRows'

const fields = ['start', 'end', 'total']

export interface TimesheetDetailsProps {
  data: TimeEntry[]
}

export const TimesheetDetails: React.FunctionComponent<
  TimesheetDetailsProps
> = ({ data }) => {
  const rows = useMemo(
    () =>
      buildTimesheetDetailsRows(data)
        .sort((a, b) => b.start.getTime() - a.start.getTime())
        .map((entry) => ({
          start: format(entry.start, 'h:mm aa'),
          end: entry.end ? format(entry.end, 'h:mm aa') : '--',
          minutes: isNaN(entry.minutes)
            ? '0 minutes'
            : `${(entry.minutes / 60).toFixed(2)} hrs`,
        })),
    [data],
  )

  return (
    <Table
      width="100%"
      margin="none"
      variant="simple"
      bg="white"
      shadow="sm"
      borderRadius="md"
    >
      <Thead>
        <Tr>
          {fields.map((field) => (
            <Th key={field}>{field}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((item) => (
          <Tr key={item.start}>
            <Td>{item.start}</Td>
            <Td>{item.end}</Td>
            <Td>{item.minutes}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}