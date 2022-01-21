import supabase from '@/lib/supabase'

import { Coordinates } from '../geolocation/Coordinates'
import { TableKeys } from '../tables'

export interface Shift {
  id: number
  employee: string
  date: Date
  clockInTime: Date
  clockInLocation: Coordinates
  clockOutTime?: Date
  clockOutLocation?: Coordinates
  note?: string
}

export type ShiftsTableConfig = { schema: Shift; primaryKey: 'id' }

export class ShiftService {
  constructor(private client = supabase) {}

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
