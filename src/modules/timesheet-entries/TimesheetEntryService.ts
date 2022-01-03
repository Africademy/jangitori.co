import { SupabaseClient } from '@supabase/supabase-js'

import { TableKeys } from '@/common/constants/tables'
import { Timesheet } from '@/common/models/Timesheet'
import { TimesheetEntry } from '@/common/models/TimesheetEntry'
import supabase from '@/modules/supabase'

export class TimesheetEntryService {
  constructor(private client: SupabaseClient = supabase) {}

  async getTimesheetEntriesByTimesheet(
    timesheet: Timesheet['id'],
  ): Promise<TimesheetEntry[]> {
    const { data, error } = await this.client
      .from<TimesheetEntry>(TableKeys.TimesheetEntries)
      .select('*')
      .eq('timesheet', timesheet)
      .order('timestamp')

    if (error) throw error

    return data ?? []
  }

  async createTimesheetEntry(args: {
    timesheet: Timesheet['id']
  }): Promise<TimesheetEntry> {
    const { data, error } = await this.client
      .from<TimesheetEntry>(TableKeys.TimesheetEntries)
      .insert({ ...args, location: {} })

    if (error) throw error

    if (!data)
      throw new Error(
        'Failed to create timesheet entry for timesheet=' + args.timesheet,
      )

    return data[0]
  }
}
