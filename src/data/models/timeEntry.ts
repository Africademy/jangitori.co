import { Coordinates } from '@/modules/geolocation/Coordinates'

export type TimeEntry = {
  id: PrimaryKey<Int8>
  timestamp: Timestamp
  location: Coordinates
  timesheet: number
}


export const TIME_ENTRIES_TABLE = 'time-entries' as const
