import format from 'date-fns/format'
import { parsePgDate } from 'pg-data-utils'

export function prettyCalendarDate(calendarDate: CalendarDate): string {
  const date = parsePgDate(calendarDate)

  const dateString = format(date, 'MMMM dd, yyyy')

  return dateString
}
