import { TimeCardApiUrlBuilder } from './TimeCardApiUrlBuilder'

export function buildTimeEntriesForEmployeeOnDateApiUrl(args: {
  uid: string
  date: CalendarDate
}): string {
  return new TimeCardApiUrlBuilder({
    employee: args.uid,
    date: args.date,
  }).build()
}
