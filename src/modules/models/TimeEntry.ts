import { Coordinates } from '../geolocation/Coordinates'

export type TimeEntry = {
  id: PrimaryKey<Int8>
  timestamp: Timestamp
  location: Coordinates
  timesheet: number
}

export type EntryTableConfig = {
  schema: TimeEntry
  primaryKey: 'id'
}
