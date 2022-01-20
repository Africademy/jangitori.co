import { AccountService } from '@/api/accounts/AccountService'
import { TimeEntryService } from '@/api/time-entries/TimeEntryService'
import { TimesheetService } from '@/api/timesheets/TimesheetService'
import { AuthService } from '@/modules/auth/AuthService'
import supabase from '@/modules/supabase'

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
