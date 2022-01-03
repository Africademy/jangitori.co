export type TimesheetEntry = {
  id: PrimaryKey<Int8>
  timestamp: Timestamp
  location: JSONB
  timesheet: number
}

export type TimesheetEntryTableConfig = {
  schema: TimesheetEntry
  primaryKey: 'id'
}
