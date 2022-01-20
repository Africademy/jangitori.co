export type TimeEntry = {
  id: PrimaryKey<Int8>
  timestamp: Timestamp
  location: JSONB
  timesheet: number
}

export type EntryTableConfig = {
  schema: TimeEntry
  primaryKey: 'id'
}
