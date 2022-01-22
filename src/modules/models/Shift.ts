import { Coordinates } from '@/modules/geolocation/Coordinates'

export type TimeClockData = { timestamp: Timestamp; location: Coordinates }

export interface Shift {
  id: number
  employee: string
  date: CalendarDate
  clockIn: TimeClockData
  clockOut?: TimeClockData | null
  note?: string
}
