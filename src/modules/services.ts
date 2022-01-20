import { AccountService } from '@/domains/accounts/AccountService'
import { TimeEntryService } from '@/domains/time-entries/TimeEntryService'
import { TimesheetService } from '@/domains/timesheets/TimesheetService'
import supabase from '@/lib/supabase'
import { AuthService } from '@/modules/auth/AuthService'

export type Services = {
  auth: AuthService
  account: AccountService
  timesheet: TimesheetService
  timeEntry: TimeEntryService
}

export const initServices = (): Services => {
  return {
    auth: new AuthService(supabase),
    account: new AccountService(supabase),
    timesheet: new TimesheetService(supabase),
    timeEntry: new TimeEntryService(supabase),
  }
}
