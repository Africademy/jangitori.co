import { makeAutoObservable } from 'mobx'
import Router from 'next/router'
import invariant from 'tiny-invariant'

import { User } from '@/data/models/user'
import { Whitelist } from '@/data/models/whitelist'
import { routes } from '@/lib/routes'
import { AuthStore } from '@/modules/auth/AuthStore'
import { EmailPasswordCreds } from '@/modules/auth/types'

import { ConfirmInfoVM } from './ConfirmInfoVM'
import { SignUpSteps } from './constants'
import { StepperStore } from './StepperStore'
import { SubmitCredsVM } from './SubmitCredsVM'
import { UserInfo } from './types'

export class SignUpVM {
  submitCredsVM = new SubmitCredsVM(this)
  emailPasswordCreds: EmailPasswordCreds = { email: '', password: '' }
  initialUser: Whitelist | null = null

  stepper: StepperStore = new StepperStore([
    SignUpSteps.Auth,
    SignUpSteps.Confirm,
  ])

  get userInfo(): UserInfo | null {
    const initialUser = this.initialUser
    if (!initialUser) return null
    return {
      email: initialUser.email,
      phone: initialUser.phone,
      firstName: initialUser.firstName,
      lastName: initialUser.lastName,
    }
  }

  get invariantUserInfo(): UserInfo {
    const userInfo = this.userInfo
    invariant(userInfo)
    return userInfo
  }

  get invariantInitialUser(): Whitelist {
    const initialUser = this.initialUser
    invariant(initialUser)
    return initialUser
  }

  setEmailPasswordCreds(value: EmailPasswordCreds) {
    this.emailPasswordCreds = value
  }

  setInitialUser(value: Whitelist) {
    this.initialUser = value
  }

  onSuccess = (user: User) => {
    this.authStore.setUser(user)
    Router.router?.push(routes.dashboardPage(user.role, 'overview'))
  }

  _confirmInfoVM: ConfirmInfoVM | null = null

  get confirmInfoVM(): ConfirmInfoVM {
    if (!this._confirmInfoVM) {
      this._confirmInfoVM = new ConfirmInfoVM(this)
    }
    return this._confirmInfoVM
  }

  constructor(private authStore: AuthStore) {
    makeAutoObservable(this, {})
  }
}
