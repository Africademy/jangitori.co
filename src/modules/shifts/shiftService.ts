import pick from 'lodash.pick'

import supabase from '@/lib/supabase'
import { Shift } from '@/modules/models/Shift'
import { TableKeys } from '@/modules/tables'

export class ShiftService {
  constructor(private client = supabase) {}

  async findShift(args: Partial<Shift>) {
    return this.client
      .from<Shift>(TableKeys.Shifts)
      .select('*')
      .match(args)
      .maybeSingle()
  }

  async getTotalHoursForDate(date: Date): Promise<number> {
    const { data, error } = await this.client
      .from<Shift>(TableKeys.Shifts)
      .select('hours')
      .eq('date', date.toISOString())

    if (error) throw error

    const totalHours =
      data?.map((shift) => shift.hours).reduce((prev, curr) => prev + curr) ?? 0

    return totalHours
  }

  async findActiveShift(args: { employee: string }) {
    return this.client
      .from<Shift>(TableKeys.Shifts)
      .select('*')
      .match({
        ...args,
        date: new Date().toISOString(),
        clockOut: null,
      })
      .limit(1)
      .maybeSingle()
  }

  async createShift(initialData: Omit<Shift, 'id'>) {
    return this.client
      .from<Shift>(TableKeys.Shifts)
      .insert(initialData)
      .maybeSingle()
      .then((res) => pick(res, ['data', 'error']))
  }

  async updateShift(id: Shift['id'], updateData: Partial<Omit<Shift, 'id'>>) {
    return this.client
      .from<Shift>(TableKeys.Shifts)
      .update(updateData)
      .eq('id', id)
      .single()
      .then((res) => pick(res, ['data', 'error']))
  }
}
