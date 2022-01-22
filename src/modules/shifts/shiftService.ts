import supabase from '@/lib/supabase'
import { Shift } from '@/modules/models/Shift'
import { TableKeys } from '@/modules/tables'

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

    if (!data) throw new Error('Failed to create Shift')

    return data[0]
  }

  async updateShift(
    id: Shift['id'],
    updateData: Partial<Omit<Shift, 'id'>>,
  ): Promise<Shift> {
    const { data, error } = await this.client
      .from<Shift>(TableKeys.Shifts)
      .update(updateData)
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) throw new Error('Failed to update shift')

    return data
  }
}
