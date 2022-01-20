import { AccountService } from '@/modules/accounts/AccountService'
import { AuthService } from '@/modules/auth/AuthService'
import supabase from '@/modules/supabase'
import { TimeEntryService } from '@/modules/time-entries/TimeEntryService'
import { TimesheetService } from '@/modules/timesheets/TimesheetService'

export type Services = {
  auth: AuthService
  account: AccountService
  timesheet: TimesheetService
  TimeEntry: TimeEntryService
}

const initServices = (): Services => {
  return {
    auth: new AuthService(supabase),
    account: new AccountService(supabase),
    timesheet: new TimesheetService(supabase),
    TimeEntry: new TimeEntryService(supabase),
  }
}

const services = initServices()

export default services
