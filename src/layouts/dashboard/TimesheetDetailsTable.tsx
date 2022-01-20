import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useMemo } from 'react'

import { buildTimesheetDetailsTableRows } from '@/modules/dashboard/buildTimesheetDetailsTableRows'
import { TimeEntry } from '@/modules/models/TimeEntry'

const fields = ['start', 'end', 'total']

export interface TimesheetDetailsTableProps {
  data: TimeEntry[]
}

export const TimesheetDetailsTable: React.FunctionComponent<
  TimesheetDetailsTableProps
> = ({ data }) => {
  const rows = useMemo(() => buildTimesheetDetailsTableRows(data), [data])

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
            <Td>{item.totalTime}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
