import { useState } from 'react'
import Calendar from 'react-calendar'

export const TimesheetCalendar = () => {
  const [date, setDate] = useState(new Date())
  return <Calendar value={date} onChange={setDate} />
}
