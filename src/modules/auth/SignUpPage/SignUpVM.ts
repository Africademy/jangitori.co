import { action, makeAutoObservable } from 'mobx'
import Router from 'next/router'
import invariant from 'tiny-invariant'

import { User } from '@/data/models/user'
import { Whitelist } from '@/data/models/whitelist'
import { UserService } from '@/data/users/userService'
import { WhitelistService } from '@/data/whitelists/whitelistService'
import { FormStore } from '@/lib/mobx/FormStore'
import { routes } from '@/lib/routes'
import { waitFor } from '@/lib/waitFor'
import { AuthStore } from '@/modules/auth/AuthStore'
import { initEmailPasswordCreds } from '@/modules/auth/helpers'
import { EmailPasswordCreds, UserInfo } from '@/modules/auth/types'

import { StepperStore } from '../../../lib/mobx/StepperStore'
import { AuthService } from '../AuthService'
import { ConfirmInfoVM } from './ConfirmInfoVM'
import { SignUpSteps } from './constants'
import { UnauthorizedUserCredentialsError } from './signUpErrors'

export class SignUpVM {
  submitCredsVM = new FormStore<EmailPasswordCreds>(
    initEmailPasswordCreds(),
    this.onSubmitCreds,
  )
  confirmInfoVM = new ConfirmInfoVM(this)

  emailPasswordCreds: EmailPasswordCreds = initEmailPasswordCreds()
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

  onSuccess(user: User) {
    this.authStore.setUser(user)
    Router.router?.push(routes.dashboardPage(user.role, 'overview'))
  }

  async onSubmitCreds(emailPasswordCreds: EmailPasswordCreds) {
    this.submitCredsVM.request.setBusy(true)
    this.submitCredsVM.request.setError(null)

    const { email } = emailPasswordCreds
    /* Get existing user data */
    const whitelist = await WhitelistService.instance().findWhitelist({
      email,
    })

    if (!whitelist) {
      const error = new UnauthorizedUserCredentialsError()
      this.submitCredsVM.request.setError(error)
      this.submitCredsVM.request.setBusy(false)
      return
    }

    const initialUser = await UserService.instance().findUser({ email })

    /* Check if user is already registered */
    if (initialUser) {
      const error = new Error('Already registered an user for this email.')
      this.submitCredsVM.request.setError(error)
      this.submitCredsVM.request.setBusy(false)
      return
    }
    this.submitCredsVM.request.setBusy(false)

    this.setInitialUser(whitelist)
    this.setEmailPasswordCreds(emailPasswordCreds)
    this.stepper.increment()
  }

  async onConfirmInfo(userInfo: UserInfo) {
    const userToCreate = {
      ...this.invariantInitialUser,
      ...userInfo,
      updatedAt: new Date().toISOString(),
    }

    /* Register user with email and password */
    const { authUser } = await AuthService.instance()
      .signUp(this.emailPasswordCreds)
      .then(async (res) => {
        await waitFor(300)
        return res
      })

    /* Write any changes to user info to DB */
    const user = await UserService.instance().createUser({
      id: authUser.id,
      ...userToCreate,
    })

    this.onSuccess(user)
  }

  constructor(private authStore: AuthStore) {
    makeAutoObservable(this, {
      onSubmitCreds: action.bound,
      setInitialUser: action.bound,
    })
  }
}
