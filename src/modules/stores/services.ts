import supabase from '@/lib/supabase'
import { AccountService } from '@/modules/accounts/AccountService'
import { AuthService } from '@/modules/auth/AuthService'
import { ShiftService } from '@/modules/shifts/shiftService'
import { TimesheetService } from '@/modules/timesheets/TimesheetService'

export type Services = {
  auth: AuthService
  account: AccountService
  timesheet: TimesheetService
  shift: ShiftService
}

export const initServices = (): Services => {
  return {
    auth: AuthService.instance(),
    account: AccountService.instance(),
    timesheet: new TimesheetService(supabase),
    shift: new ShiftService(supabase),
  }
}
