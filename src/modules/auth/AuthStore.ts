import { Session } from '@supabase/gotrue-js'
import { makeAutoObservable } from 'mobx'
import invariant from 'tiny-invariant'

import { User } from '@/data/models/user'
import { UserService } from '@/data/users/userService'
import supabase from '@/lib/supabase'
import { RootStore } from '@/modules/stores'
import { Services } from '@/modules/stores/services'

import { AuthService } from './AuthService'

export class AuthStore {
  session: Session | null
  user: User | null

  setSession(value: Session | null) {
    this.session = value
  }

  setUser(value: User | null) {
    this.user = value
  }

  get invariantUser(): User {
    const user = this.user
    invariant(user, 'AuthStore user not found')
    return user
  }

  get isAuthenticated(): boolean {
    return Boolean(this.user && this.session)
  }

  async init() {
    const session = this.session

    if (!session) {
      this.setUser(null)
      return
    }
    const authUser = await this.authService.getSessionUser(session.access_token)
    const user = await this.userService.getUser({ id: authUser.id })
    this.setUser(user)
  }

  reset() {
    this.session = null
    this.user = null
  }

  private userService: UserService
  private authService: AuthService

  constructor(
    private root: RootStore,
    services: Pick<Services, 'auth' | 'user'>,
  ) {
    this.userService = services.user
    this.authService = services.auth
    const session = supabase.auth.session()
    this.session = session
    this.user = null

    makeAutoObservable(this, {}, { name: 'AuthStore' })
  }
}
