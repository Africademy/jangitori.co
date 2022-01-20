import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import setDate from 'date-fns/setDate'
import startOfMonth from 'date-fns/startOfMonth'

export function computePayPeriod(date = new Date()): {
  start: Date
  end: Date
} {
  if (date.getDate() < 15) {
    const startDate = startOfMonth(date)
    const start = startDate
    const end = setDate(startDate, 15)
    return { start, end }
  } else {
    const start = setDate(date, 16)
    const end = lastDayOfMonth(date)
    return { start, end }
  }
}
