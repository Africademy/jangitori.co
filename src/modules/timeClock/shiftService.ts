import supabase from '@/lib/supabase'

import { Coordinates } from '../geolocation/Coordinates'
import { TableKeys } from '../tables'

export type TimeClockData = { timestamp: Timestamp; location: Coordinates }

export interface Shift {
  id: number
  employee: string
  date: CalendarDate
  clockIn: TimeClockData
  clockOut?: TimeClockData | null
  note?: string
}

export type ShiftsTableConfig = { schema: Shift; primaryKey: 'id' }

export class ShiftService {
  constructor(private client = supabase) {}

  async findShift(args: Partial<Shift>): Promise<Shift | null> {
    const { data, error } = await this.client
      .from<Shift>(TableKeys.Shifts)
      .select('*')
      .match(args)
      .limit(1)
      .maybeSingle()

    if (error) throw error

    return data
  }

  async findActiveShift(args: { employee: string }): Promise<Shift | null> {
    const { data, error } = await this.client
      .from<Shift>(TableKeys.Shifts)
      .select('*')
      .match({
        ...args,
        date: new Date().toISOString(),
        clockOut: null,
      })
      .limit(1)
      .maybeSingle()

    if (error) throw error

    return data
  }

  async createShift(initialData: Omit<Shift, 'id'>): Promise<Shift> {
    const { data, error } = await this.client
      .from<Shift>(TableKeys.Shifts)
      .insert(initialData)

    if (error) throw error

    if (!data)
      throw new Error(
        'Failed to create Shift for initial shift data=' + initialData,
      )

    return data[0]
  }
}
