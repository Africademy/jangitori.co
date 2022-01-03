import React from 'react'

import { TimeCardEntry } from '@/common/models/TimeCard'
import { buildTimeTableRows } from '@/modules/timeCards/buildTimeTableRows'
import Animated3Dots from '@/ui/Animated3Dots'

import { Table } from './table'

const fields = ['start', 'end', 'total']

export interface TimeCardTableProps {
  timeCardEntries: TimeCardEntry[] | undefined
}

export const TimeCardTable: React.FunctionComponent<TimeCardTableProps> = ({
  timeCardEntries,
}) => {
  const rows = timeCardEntries ? buildTimeTableRows(timeCardEntries) : null

  if (!rows) return <Animated3Dots />

  if (rows.length === 0)
    return (
      <div>
        <p>No entries found for today.</p>
      </div>
    )

  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[50vh] md:max-h-[70vh] min-w-full">
      <div className="shadow overflow-hidden rounded-lg">
        <Table>
          <Table.Head>
            <tr>
              {fields.map((field) => (
                <Table.HeadCell key={field}>{field}</Table.HeadCell>
              ))}
            </tr>
          </Table.Head>
          <Table.Body>
            {rows.map((entry, index) => (
              <tr key={index}>
                <Table.Cell>{entry.start}</Table.Cell>
                <Table.Cell>{entry.end}</Table.Cell>
                <Table.Cell>{entry.totalTime}</Table.Cell>
              </tr>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
