import { SupabaseClient } from '@supabase/supabase-js'

import { Account, AccountUpdateData } from '@/db/models/Account'
import { TableKeys } from '@/db/tables'
import { NullResponsePropertyError } from '@/lib/errors'

export class AccountService {
  constructor(private supabase: SupabaseClient) {}

  getAccountByEmail = async (email: string): Promise<Account | null> => {
    const { data, error } = await this.supabase
      .from<Account>(TableKeys.Accounts)
      .select('*')
      .eq('email', email)
      .maybeSingle()

    if (error) throw error
    return data
  }

  getAccountByphone = async (phone: string): Promise<Account | null> => {
    const { data, error } = await this.supabase
      .from<Account>(TableKeys.Accounts)
      .select('*')
      .eq('phone', phone)
      .maybeSingle()

    if (error) throw error
    return data
  }

  getAccount = async (uid: string): Promise<Account> => {
    const { data, error } = await this.supabase
      .from<Account>(TableKeys.Accounts)
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
    const { data, error } = await this.supabase
      .from<Account>(TableKeys.Accounts)
      .update(updateData)
      .eq('email', email)
      .maybeSingle()

    if (error) throw error
    if (!data) throw new NullResponsePropertyError('data')
    return data
  }
}
