import { ReviewStatus } from '@/modules/reviewStatus'

export interface Timesheet {
  id: Int8
  payPeriodEnd: CalendarDate
  employee: UUID
  hours: Float4
  status: ReviewStatus
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type TimesheetTableConfig = {
  schema: Timesheet
  primaryKey: 'id'
}
