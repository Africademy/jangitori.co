import { SupabaseClient } from '@supabase/supabase-js'

import { TimeEntry } from '@/domains/models/TimeEntry'
import { Timesheet } from '@/domains/models/Timesheet'
import { TableKeys } from '@/domains/tables'
import supabase from '@/lib/supabase'

export class TimeEntryService {
  constructor(private client: SupabaseClient = supabase) {}

  async getTimeEntries(timesheet: Timesheet['id']): Promise<TimeEntry[]> {
    const { data, error } = await this.client
      .from<TimeEntry>(TableKeys.TimeEntries)
      .select('*')
      .eq('timesheet', timesheet)
      .order('timestamp')

    if (error) throw error

    return data ?? []
  }

  async createEntry(args: { timesheet: Timesheet['id'] }): Promise<TimeEntry> {
    const { data, error } = await this.client
      .from<TimeEntry>(TableKeys.TimeEntries)
      .insert({ ...args, location: {} })

    if (error) throw error

    if (!data)
      throw new Error(
        'Failed to create timesheet entry for timesheet=' + args.timesheet,
      )

    return data[0]
  }
}
