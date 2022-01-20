import toDate from 'date-fns/toDate'

export function lastDayOfMonth(dirtyDate: Date | number): Date {
  const date = toDate(dirtyDate)
  const month = date.getMonth()
  date.setFullYear(date.getFullYear(), month + 1, 0)
  date.setHours(0, 0, 0, 0)
  return date
}
