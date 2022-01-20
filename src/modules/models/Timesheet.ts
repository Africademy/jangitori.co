export enum TimesheetStatus {
  IN_PROGRESS = 'in-progress',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  CHANGE_REQUESTED = 'change-requested',
}

export interface Timesheet {
  id: Int8
  payPeriodEnd: CalendarDate
  employee: UUID
  hours: Float4
  status: TimesheetStatus
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type TimesheetTableConfig = {
  schema: Timesheet
  primaryKey: 'id'
}
