import supabase from '@/lib/supabase'
import { AccountService } from '@/modules/accounts/AccountService'
import { AuthService } from '@/modules/auth/AuthService'
import { TimeEntryService } from '@/modules/time-entries/TimeEntryService'
import { TimesheetService } from '@/modules/timesheets/TimesheetService'

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
