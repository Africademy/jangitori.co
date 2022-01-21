import { useState } from 'react'
import Calendar from 'react-calendar'

export const TimesheetCalendar = ({
  payPeriod,
}: {
  payPeriod: { start: Date; end: Date }
}) => {
  const [date, setDate] = useState(new Date())
  return (
    <Calendar
      value={date}
      onChange={setDate}
      minDate={payPeriod.start}
      maxDate={payPeriod.end}
    />
  )
}
