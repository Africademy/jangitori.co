import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import format from 'date-fns/format'
import React, { useMemo } from 'react'

import { buildTimesheetDetailsRows } from '@/modules/dashboard/buildTimesheetDetailsRows'
import { TimeEntry } from '@/modules/models/TimeEntry'

const fields = ['start', 'end', 'total']

export interface TimesheetDetailsTableProps {
  data: TimeEntry[]
}

export const TimesheetDetailsTable: React.FunctionComponent<
  TimesheetDetailsTableProps
> = ({ data }) => {
  const rows = useMemo(
    () =>
      buildTimesheetDetailsRows(data).map((entry) => ({
        start: format(entry.start, 'h:m aaa'),
        end: entry.end?.toLocaleString() ?? '--',
        minutes: isNaN(entry.minutes)
          ? '0 minutes'
          : `${entry.minutes} minutes`,
      })),
    [data],
  )

  return (
    <Table variant="simple" bg="white" shadow="sm" borderRadius="md">
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
