import { Session } from '@supabase/gotrue-js'
import { makeAutoObservable } from 'mobx'
import invariant from 'tiny-invariant'

import supabase from '@/lib/supabase'
import { Account } from '@/modules/models/Account'
import { RootStore } from '@/modules/stores'

import { AccountService } from '../accounts/AccountService'
import { Services } from '../stores/services'
import { AuthService } from './AuthService'

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

  get invariantAccount(): Account {
    const account = this.account
    invariant(account, 'AuthStore account not found')
    return account
  }

  get isAuthenticated(): boolean {
    return Boolean(this.account && this.session)
  }

  private async reloadAccountForSession(session: Session | null) {
    if (!session) {
      this.setAccount(null)
      return
    }
    const authUser = await this.authService.getSessionUser(session.access_token)
    const account = await this.accountService.getAccount(authUser.id)
    this.setAccount(account)
  }

  reset() {
    this.session = null
    this.account = null
  }

  private accountService: AccountService
  private authService: AuthService

  constructor(
    private root: RootStore,
    services: Pick<Services, 'auth' | 'account'>,
  ) {
    this.accountService = services.account
    this.authService = services.auth

    const session = supabase.auth.session()
    this.session = session
    this.account = null
    makeAutoObservable(this, {}, { name: 'AuthStore' })
    this.reloadAccountForSession(session)
  }
}
