import { Account } from '@/data/models/account'
import { Timesheet } from '@/data/models/timesheet'

export type TimesheetDetailsQuery = {
  employee: Account['uid']
  payPeriodEnd: Timesheet['payPeriodEnd']
}

export const isTimesheetDetailsQuery = (o: any): o is TimesheetDetailsQuery => {
  if (typeof o !== 'object') return false

  const keys = Object.keys(o)

  return (
    keys.length === 2 &&
    keys.includes('employee') &&
    keys.includes('payPeriodEnd')
  )
}
