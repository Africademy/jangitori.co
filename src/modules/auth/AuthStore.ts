import { Session } from '@supabase/gotrue-js'
import { makeAutoObservable } from 'mobx'

import { RootStore } from '@/app/store'
import supabase from '@/lib/supabase'
import { Account } from '@/modules/models/Account'

export class AuthStore {
  session: Session | null
  account: Account | null

  setSession(value: Session | null) {
    this.session = value
    this.reloadAccountForSession(value)
  }

  setAccount(value: Account | null) {
    this.account = value
  }

  get isAuthenticated(): boolean {
    return Boolean(this.account && this.session)
  }

  private async reloadAccountForSession(session: Session | null) {
    if (!session) {
      this.setAccount(null)
      return
    }
    const authUser = await this.store.services.auth.getSessionUser(
      session.access_token,
    )
    const account = await this.store.services.account.getAccount(authUser.id)
    this.setAccount(account)
  }

  reset() {
    this.session = null
    this.account = null
  }

  constructor(private store: RootStore) {
    const session = supabase.auth.session()
    this.session = session
    this.account = null
    makeAutoObservable(this, {}, { name: 'AuthStore' })
    this.reloadAccountForSession(session)
  }
}
