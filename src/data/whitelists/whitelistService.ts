import { SupabaseClient } from '@supabase/supabase-js'

import { Whitelist, WHITELISTS_TABLE } from '@/data/models/whitelist'
import supabase from '@/lib/supabase'

export class WhitelistService {
  private constructor(private client: SupabaseClient = supabase) {}

  private static _instance: WhitelistService | null = null

  static instance(): WhitelistService {
    if (this._instance) return this._instance

    this._instance = new WhitelistService()

    return this._instance
  }

  findWhitelist = async (
    args: Partial<Whitelist>,
  ): Promise<Whitelist | null> => {
    const { data, error } = await this.client
      .from<Whitelist>(WHITELISTS_TABLE)
      .select('*')
      .match(args)
      .maybeSingle()

    if (error) throw error

    return data
  }
}
