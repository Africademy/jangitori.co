import { ReviewStatus } from '@/modules/reviewStatus'

export interface Timesheet {
  id: Int8
  payPeriodEnd: CalendarDate
  employee: UUID
  totalHours?: number
  status: ReviewStatus
  createdAt: Timestamp
  updatedAt: Timestamp
}
