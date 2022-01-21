import { SupabaseClient } from '@supabase/supabase-js'

import supabase from '@/lib/supabase'
import { Timesheet } from '@/modules/models/Timesheet'
import { ReviewStatus } from '@/modules/reviewStatus'
import { TableKeys } from '@/modules/tables'

export class TimesheetService {
  constructor(private client: SupabaseClient = supabase) {}

  async getTimesheetsByEmployee(employee: string): Promise<Timesheet[]> {
    const { data, error } = await this.client
      .from<Timesheet>(TableKeys.Timesheets)
      .select('*')
      .eq('employee', employee)
      .order('payPeriodEnd', { ascending: true })
    if (error) throw error
    return data ?? []
  }

  async getTimesheetByEmployeeAndPayPeriod(args: {
    employee: string
    payPeriodEnd: string
  }): Promise<Timesheet | null> {
    const { data, error } = await this.client
      .from<Timesheet>(TableKeys.Timesheets)
      .select('*')
      .match(args)
      .limit(1)
      .maybeSingle()

    if (error) throw error

    return data
  }

  async getOrCreateTimesheet(args: {
    employee: string
    payPeriodEnd: string
  }): Promise<Timesheet> {
    const timesheet = await this.getTimesheetByEmployeeAndPayPeriod(args)
    if (timesheet) return timesheet

    const { data, error } = await this.client
      .from<Timesheet>(TableKeys.Timesheets)
      .insert({
        ...args,
        status: ReviewStatus.PENDING,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })

    if (error) throw error

    if (!data)
      throw new Error(
        'Failed to create timesheet for employee=' +
          args.employee +
          ' and payPeriodEnd=' +
          args.payPeriodEnd,
      )

    return data[0]
  }

  async updateTimesheet({
    id,
    ...updateData
  }: { id: Timesheet['id'] } & Partial<Omit<Timesheet, 'id'>>) {
    const { data, error } = await this.client
      .from<Timesheet>(TableKeys.Timesheets)
      .update(updateData)
      .eq('id', id)

    if (error) throw error

    if (!data) throw new Error('Failed to update timesheet for id=' + id)

    return data[0]
  }
}
