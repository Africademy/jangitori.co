import { TableKeys } from '@/common/constants/tables'
import { TimeCard } from '@/common/models/TimeCard'
import { toDateString } from '@/common/utils/date-fns'
import { toPgCalendarDateQuery } from '@/common/utils/date-fns/calendarDate'
import supabase from '@/modules/supabase'

import { TimeCardApiUrlBuilder } from './TimeCardApiUrlBuilder'

export interface GetTimeCardForEmployeeOnDateArgs {
  employee: string
  date: Date
}

export interface GetTodaysTimeCardForEmployeeArgs {
  employee: string
}

export function buildTimeCardForEmployeeOnDateApiUrl(
  args: GetTimeCardForEmployeeOnDateArgs,
): string {
  return new TimeCardApiUrlBuilder()
    .addFilter('date', toPgCalendarDateQuery(args.date))
    .addFilter('employee', args.employee)
    .build()
}

export function buildTodaysTimeCardForEmployeeApiUrl(
  args: GetTodaysTimeCardForEmployeeArgs,
): string {
  const now = new Date()
  return new TimeCardApiUrlBuilder()
    .addFilter('year', now.getFullYear())
    .addFilter('month', now.getMonth() + 1)
    .addFilter('day', now.getDate())
    .addFilter('employee', args.employee)
    .build()
}

export const getTimeCardForEmployeeOnDate = async ({
  employee,
  date,
}: GetTimeCardForEmployeeOnDateArgs): Promise<TimeCard | null> => {
  const args = {
    date: toDateString(date),
    employee,
  }
  const { data, error } = await supabase
    .from<TimeCard>(TableKeys.TimeCards)
    .select('*')
    .eq('date', args.date)
    .eq('employee', args.employee)
    .maybeSingle()

  if (error) throw error
  return data
}
