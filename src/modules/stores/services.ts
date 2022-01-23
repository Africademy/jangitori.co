import { UserService } from '@/data/users/userService'
import supabase from '@/lib/supabase'
import { AuthService } from '@/modules/auth/AuthService'
import { ShiftService } from '@/modules/shifts/shiftService'
import { TimesheetService } from '@/modules/timesheets/TimesheetService'

export type Services = {
  auth: AuthService
  user: UserService
  timesheet: TimesheetService
  shift: ShiftService
}

export const initServices = (): Services => {
  return {
    auth: AuthService.instance(),
    user: UserService.instance(),
    timesheet: new TimesheetService(supabase),
    shift: new ShiftService(supabase),
  }
}
