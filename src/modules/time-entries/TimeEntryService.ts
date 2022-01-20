import { SupabaseClient } from '@supabase/supabase-js'

import supabase from '@/lib/supabase'
import { TimeEntry } from '@/modules/models/TimeEntry'
import { Timesheet } from '@/modules/models/Timesheet'
import { TableKeys } from '@/modules/tables'

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

  async createEntry(args: Partial<TimeEntry>): Promise<TimeEntry> {
    const defaultTimeEntryData: Partial<TimeEntry> = {
      location: {},
      timestamp: new Date().toLocaleString(),
    }
    const { data, error } = await this.client
      .from<TimeEntry>(TableKeys.TimeEntries)
      .insert({ ...defaultTimeEntryData, ...args })

    if (error) throw error

    if (!data)
      throw new Error(
        'Failed to create timesheet entry for timesheet=' + args.timesheet,
      )

    return data[0]
  }
}
