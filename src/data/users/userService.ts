import { SupabaseClient } from '@supabase/supabase-js'

import { User, USERS_TABLE } from '@/data/models/user'
import { NullResponsePropertyError } from '@/lib/errors'
import supabase from '@/lib/supabase'

export class UserService {
  private constructor(private client: SupabaseClient = supabase) {}

  private static _instance: UserService | null = null

  static instance(): UserService {
    if (this._instance) return this._instance

    this._instance = new UserService()

    return this._instance
  }

  async createUser(args: User): Promise<User> {
    const { data, error } = await this.client
      .from<User>(USERS_TABLE)
      .insert(args)
      .single()

    if (error) throw error
    if (!data) throw new NullResponsePropertyError('data')

    return data
  }

  async findUser(args: Partial<User>): Promise<User | null> {
    const { data, error } = await this.client
      .from<User>(USERS_TABLE)
      .select('*')
      .match(args)
      .limit(1)

    if (error) throw error

    return data ? data[0] : null
  }

  async getUser(args: Partial<User>): Promise<User> {
    const { data, error } = await this.client
      .from<User>(USERS_TABLE)
      .select('*')
      .match(args)
      .maybeSingle()

    if (error) throw error

    if (!data) throw new NullResponsePropertyError('data')

    return data
  }
}
