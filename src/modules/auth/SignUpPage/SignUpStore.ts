import { action, makeAutoObservable } from 'mobx'
import Router from 'next/router'
import invariant from 'tiny-invariant'

import { User } from '@/data/models/user'
import { Whitelist } from '@/data/models/whitelist'
import { UserService } from '@/data/users/userService'
import { WhitelistService } from '@/data/whitelists/whitelistService'
import { logger } from '@/infra/logger'
import { routes } from '@/lib/routes'
import { waitFor } from '@/lib/waitFor'
import { AuthService } from '@/modules/auth/AuthService'
import { AuthStore } from '@/modules/auth/AuthStore'
import { EmailPasswordCreds } from '@/modules/auth/types'

import { SignUpSteps } from './constants'
import { RequestStore } from './RequestStore'
import { UnauthorizedUserCredentialsError } from './signUpErrors'
import { StepperStore } from './StepperStore'
import { UserInfo } from './types'

export class SignUpStore {
  emailPasswordCreds: EmailPasswordCreds = { email: '', password: '' }
  initialUser: Whitelist | null = null

  request: RequestStore = new RequestStore()
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

  get invariantInitialUser(): Whitelist {
    const initialUser = this.initialUser
    invariant(initialUser)
    return initialUser
  }

  setEmailPasswordCreds(value: EmailPasswordCreds) {
    this.emailPasswordCreds = value
  }

  setInitialUserInfo(value: Whitelist) {
    this.initialUser = value
  }

  handleError(error: unknown) {
    logger.error(
      '❌ failed to fetch employee. Error: ' + (error as Error).message,
    )
    alert((error as Error).message)
    this.request.setError((error as Error).message)
  }

  async onSubmitCreds({ email }: EmailPasswordCreds) {
    this.request.start()
    try {
      /* Get existing user data */
      const whitelist = await this.whitelistService.findWhitelist({
        email,
      })
      if (!whitelist) throw new UnauthorizedUserCredentialsError()

      const initialUser = await this.userService.findUser({ email })

      /* Check if user is already registered */
      if (initialUser) {
        throw new Error('Already registered an user for this email.')
      }

      this.setInitialUserInfo(whitelist)
      this.stepper.increment()
    } catch (error) {
      this.handleError(error)
    } finally {
      this.request.setBusy(false)
    }
  }

  async onConfirmInfo(userInfo: UserInfo) {
    const userToCreate = {
      ...this.invariantInitialUser,
      ...userInfo,
      updatedAt: new Date().toISOString(),
    }

    this.request.setError(null)
    this.request.setBusy(true)
    try {
      /* Register user with email and password */
      const { authUser } = await this.authService
        .signUp(this.emailPasswordCreds)
        .then(async (res) => {
          await waitFor(300)
          return res
        })

      /* Write any changes to user info to DB */
      const user = await this.userService.createUser({
        uid: authUser.id,
        ...userToCreate,
      })

      this.onSuccess(user)
    } catch (error) {
      this.handleError(error)
      this.request.setBusy(false)
    }
  }

  onSuccess = (user: User) => {
    this.authStore.setUser(user)
    Router.router?.push(routes.dashboardPage(user.role, 'overview'))
  }

  constructor(
    private authStore: AuthStore,
    private authService: AuthService = AuthService.instance(),
    private whitelistService: WhitelistService = WhitelistService.instance(),
    private userService: UserService = UserService.instance(),
  ) {
    makeAutoObservable(this, {
      onSubmitCreds: action.bound,
      onConfirmInfo: action.bound,
    })
  }
}
