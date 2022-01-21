import { TimesheetStatus } from '../models/Timesheet'

export const TimesheetStatusLabel = {
  [TimesheetStatus.IN_PROGRESS]: 'In progress',
  [TimesheetStatus.SUBMITTED]: 'Submitted',
  [TimesheetStatus.APPROVED]: 'Approved',
  [TimesheetStatus.CHANGE_REQUESTED]: 'Change requested',
}

export const TimesheetStatusColor = {
  [TimesheetStatus.IN_PROGRESS]: 'gray',
  [TimesheetStatus.SUBMITTED]: 'blue',
  [TimesheetStatus.APPROVED]: 'green',
  [TimesheetStatus.CHANGE_REQUESTED]: 'orange',
}
