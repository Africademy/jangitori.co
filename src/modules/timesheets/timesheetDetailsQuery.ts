import { Account } from '../models/Account'
import { Timesheet } from '../models/Timesheet'

export type TimesheetDetailsQuery = {
  employee: Account['uid']
  payPeriodEnd: Timesheet['payPeriodEnd']
}
