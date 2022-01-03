import { AccountService } from '@/modules/accounts/AccountService'
import { AuthService } from '@/modules/auth/AuthService'
import supabase from '@/modules/supabase'
import { TimeCardService } from '@/modules/timeCards/TimeCardService'
import { TimesheetEntryService } from '@/modules/timesheet-entries/TimesheetEntryService'
import { TimesheetService } from '@/modules/timesheets/TimesheetService'

export type Services = {
  auth: AuthService
  account: AccountService
  timeCard: TimeCardService
  timesheet: TimesheetService
  timesheetEntry: TimesheetEntryService
}

const initServices = (): Services => {
  return {
    auth: new AuthService(supabase),
    account: new AccountService(supabase),
    timeCard: new TimeCardService(supabase),
    timesheet: new TimesheetService(supabase),
    timesheetEntry: new TimesheetEntryService(supabase),
  }
}

const services = initServices()

export default services
