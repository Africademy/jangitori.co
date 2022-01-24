import format from 'date-fns/format'

import { toDateString } from '@/lib/date'

export interface CalendarDateObject {
  year: number
  month: number
  day: number
}

export function isCalendarDateObject(o: any): o is CalendarDateObject {
  return (
    typeof o === 'object' &&
    Object.entries(o).every(
      ([key, value]) =>
        ['year', 'month', 'day'].includes(key) && typeof value === 'number',
    )
  )
}

export function calendarDateToDate(date: CalendarDate): Date {
  const [year, month, day] = date.split('-').map((v) => parseInt(v))
  return calendarDateObjectToDate({ year, month, day })
}

export function calendarDateObjectToDate({
  year,
  month,
  day,
}: CalendarDateObject): Date {
  return new Date(year, month - 1, day, 0, 0, 0, 0)
}

export function dateStringToISO(dateString: CalendarDate): DateISOString {
  const [month, day, year] = dateString
    .split('/')
    .map((value) => parseInt(value))

  return calendarDateObjectToDate({ year, month, day }).toISOString()
}

export function isCalendarDateString(o: any): o is CalendarDate {
  if (typeof o !== 'string' || !o.includes('/') || o.split('/').length !== 3)
    return false
  const [v1, v2, v3] = o.split('/')

  let res = v1.length === 2 && !isNaN(parseInt(v1))

  res = res && v2.length === 2 && !isNaN(parseInt(v2))
  res = res && v3.length === 4 && !isNaN(parseInt(v3))

  return res
}

export function toPgCalendarDateQuery(
  date: CalendarDate | CalendarDateObject | Date,
): string {
  if (isCalendarDateObject(date)) {
    return toDateString(calendarDateObjectToDate(date))
  } else if (isCalendarDateString(date)) {
    return dateStringToISO(date)
  }
  return toDateString(date)
}

export const truncateCalendarDate = (date: CalendarDate): string =>
  date.split('-').slice(0, 2).join('-')

export function prettyCalendarDateWithoutYear(
  calendarDate: CalendarDate,
): string {
  const date = calendarDateToDate(calendarDate)

  const dateString = format(date, 'MMMM dd')

  return dateString
}

export function prettyCalendarDateAbbr(calendarDate: CalendarDate): string {
  const date = calendarDateToDate(calendarDate)

  const dateString = format(date, "MMM dd ''yy'")

  return dateString
}

export function prettyCalendarDateAbbrMonth(
  calendarDate: CalendarDate,
): string {
  const date = calendarDateToDate(calendarDate)

  const dateString = format(date, 'MMM dd, yyyy')

  return dateString
}
