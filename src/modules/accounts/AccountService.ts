import { SupabaseClient } from '@supabase/supabase-js'

import {
  Account,
  ACCOUNTS_TABLE,
  AccountUpdateData,
} from '@/data/models/account'
import { NullResponsePropertyError } from '@/lib/errors'
import supabase from '@/lib/supabase'

export class AccountService {
  private constructor(private client: SupabaseClient = supabase) {}

  private static _instance: AccountService | null = null

  static instance(): AccountService {
    if (this._instance) return this._instance

    this._instance = new AccountService()

    return this._instance
  }

  getAccountByEmail = async (email: string): Promise<Account | null> => {
    const { data, error } = await this.client
      .from<Account>(ACCOUNTS_TABLE)
      .select('*')
      .eq('email', email)
      .maybeSingle()

    if (error) throw error
    return data
  }

  getAccountByphone = async (phone: string): Promise<Account | null> => {
    const { data, error } = await this.client
      .from<Account>(ACCOUNTS_TABLE)
      .select('*')
      .eq('phone', phone)
      .maybeSingle()

    if (error) throw error
    return data
  }

  getAccount = async (uid: string): Promise<Account> => {
    const { data, error } = await this.client
      .from<Account>(ACCOUNTS_TABLE)
      .select('*')
      .eq('uid', uid)
      .maybeSingle()

    if (error) throw error

    if (!data) throw new NullResponsePropertyError('data')

    return data
  }

  updateAccountByEmail = async (
    email: string,
    updateData: Partial<AccountUpdateData>,
  ): Promise<Account> => {
    const { data, error } = await this.client
      .from<Account>(ACCOUNTS_TABLE)
      .update(updateData)
      .eq('email', email)
      .maybeSingle()

    if (error) throw error
    if (!data) throw new NullResponsePropertyError('data')
    return data
  }
}
