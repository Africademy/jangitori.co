import format from 'date-fns/format'
import millisecondsToHours from 'date-fns/millisecondsToHours'
import parse from 'date-fns/parse'

export const PostgrestTimeFormat = 'HH:mm:ss'

export const pgTimeToDate = (time: string): Date => {
  const result = parse(time.slice(0, 8), PostgrestTimeFormat, new Date())

  return result
}

export function toPgTime(date: Date): Time {
  const pgTime = format(date, PostgrestTimeFormat)

  return pgTime
}

export function getHoursBetween(a: string, b: string): number {
  const msBtwn = Math.abs(pgTimeToDate(a).getTime() - pgTimeToDate(b).getTime())

  const hoursBetween = millisecondsToHours(msBtwn)
  return hoursBetween
}

export function truncatePgTime(timeString: string): string {
  if (!timeString) return '--'

  return `${timeString.slice(0, 8).split(':').slice(0, 2).join(':')}`
}

export function formatPgTime(date: Date): string {
  const pgTime = toPgTime(date)
  const truncated = truncatePgTime(pgTime)
  return truncated
}
