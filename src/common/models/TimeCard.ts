export interface TimeCardEntry {
  location: Record<string, string>
  time: Time
}

/**
 * Daily report of time entries
 */
export type TimeCard = {
  id: Int8
  employee: UUID
  payPeriodEnd: CalendarDate
  date: CalendarDate
  entries: TimeCardEntry[]
  createdAt: DateISOString
}

export const TimeCardColumns = {
  Entries: 'entries[]',
}

export type TimeCardTableConfig = {
  schema: TimeCard
  primaryKey: 'id'
}
