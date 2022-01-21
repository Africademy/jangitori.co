import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { css } from '@emotion/react'

import { Timesheet } from '@/modules/models/Timesheet'
import { StatusTag } from '@/modules/reviewStatus'
import { only } from '@/ui/utils/breakpoints'
export const timesheetsTableFields = ['payPeriodEnd', 'hours', 'status']

export const TimesheetColumnLabel = {
  payPeriodEnd: 'Payday',
  createdAt: 'Created At',
  updatedAt: 'Updated At',
  status: 'Status',
}

function normalizeDoubleDigitString(monthOrDayString: string): string {
  return monthOrDayString.length === 1 || monthOrDayString[0] !== '0'
    ? monthOrDayString
    : monthOrDayString[1]
}

export function formatPayPeriodEnd(calendarDate: string): string {
  const [yearString, monthString, dayString] = calendarDate.split('-')
  const day = normalizeDoubleDigitString(dayString)
  const month = normalizeDoubleDigitString(monthString)
  const year = yearString.slice(2)
  return [month, day, year].join('/')
}

const STh = ({ children, ...props }) => {
  return (
    <Th
      {...props}
      maxW="6rem"
      css={css`
        ${only('mobile')} {
          padding: 0.5rem 0.75rem;
        }
      `}
    >
      {children}
    </Th>
  )
}

const TimesheetsTable = ({ data }: { data: Timesheet[] }) => {
  return (
    <Table variant="simple" bg="white" shadow="sm" borderRadius="md">
      <Thead>
        <Tr>
          <STh>{TimesheetColumnLabel['payPeriodEnd']}</STh>
          <STh>{TimesheetColumnLabel['status']}</STh>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => (
          <Tr key={item.id}>
            <Td>{formatPayPeriodEnd(item.payPeriodEnd)}</Td>
            <Td>
              <StatusTag status={item.status} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default TimesheetsTable
