import { ReviewStatus } from '@/modules/reviewStatus'

export interface Timesheet {
  id: Int8
  payPeriodEnd: CalendarDate
  employee: UUID
  status: ReviewStatus
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type TimesheetTableConfig = {
  schema: Timesheet
  primaryKey: 'id'
}
