import { action, makeAutoObservable } from 'mobx'
import Router from 'next/router'
import invariant from 'tiny-invariant'

import { Whitelist } from '@/data/models/whitelist'
import { UserService } from '@/data/users/userService'
import { WhitelistService } from '@/data/whitelists/whitelistService'
import { createLogger } from '@/lib/logger'
import { routes } from '@/lib/routes'
import { waitFor } from '@/lib/waitFor'
import { AuthService } from '@/modules/auth/AuthService'
import { AuthStore } from '@/modules/auth/AuthStore'
import { EmailPasswordCreds } from '@/modules/auth/types'

import { UnauthorizedUserCredentialsError } from './signUpErrors'
import { UserInfo } from './types'

const fileLabel = 'modules/auth/SignUpPage/SignUpStore'
const logger = createLogger({ fileLabel })

export enum SignUpSteps {
  Auth,
  Confirm,
}
export class SignUpStore {
  emailPasswordCreds: EmailPasswordCreds = { email: '', password: '' }
  initialUser: Whitelist | null = null

  currentStep: SignUpSteps = SignUpSteps.Auth
  error: string | null = null
  isLoading = false

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

  get isConfirmDisabled(): boolean {
    return (
      !Object.values(this.emailPasswordCreds).every(Boolean) ||
      !Object.values(this.invariantInitialUser).every(Boolean)
    )
  }

  setEmailPasswordCreds(value: EmailPasswordCreds) {
    this.emailPasswordCreds = value
  }

  onChange(field: keyof EmailPasswordCreds, value: string) {
    this.emailPasswordCreds[field] = value
  }

  setInitialUserInfo(value: Whitelist) {
    this.initialUser = value
  }

  setError(val: string | null) {
    this.error = val
  }

  setIsLoading(val: boolean) {
    this.isLoading = val
  }

  handleError(error: unknown) {
    logger.error(
      '❌ failed to fetch employee. Error: ' + (error as Error).message,
    )
    alert((error as Error).message)
    this.setError((error as Error).message)
  }

  async onSubmitUserCredentials({ email }: EmailPasswordCreds) {
    this.setIsLoading(true)
    this.setError(null)
    try {
      /* Get existing user data */
      const whitelist = await this.whitelistService.findWhitelist({
        email,
      })
      if (!whitelist) throw new UnauthorizedUserCredentialsError()

      const initialUser = await this.userService.getUser({ email })

      /* Check if user is already registered */
      if (initialUser) {
        throw new Error('Already registered an user for this email.')
      }

      this.setInitialUserInfo(whitelist)
      this.currentStep = SignUpSteps.Confirm
    } catch (error) {
      this.handleError(error)
    } finally {
      this.setIsLoading(false)
    }
  }

  async onSubmitConfirmation(event: React.FormEvent) {
    event.preventDefault()

    const formData = this.emailPasswordCreds
    const initialUser = this.invariantInitialUser

    this.setError(null)
    this.setIsLoading(true)
    try {
      /* Register user with email and password */
      const { authUser } = await this.authService.signUp(formData)
      logger.info(`✅ registered user for email ${formData.email}`)
      await waitFor(500)

      /* Write any changes to user info to DB */
      const user = await this.userService.createUser({
        ...initialUser,
        updatedAt: new Date().toISOString(),
        uid: authUser.id,
      })

      this.authStore.setUser(user)
      Router.router?.push(routes.dashboardPage(user.role, 'overview'))
    } catch (error) {
      this.handleError(error)
    } finally {
      this.setIsLoading(false)
    }
  }

  constructor(
    private authStore: AuthStore,
    private authService: AuthService = AuthService.instance(),
    private whitelistService: WhitelistService = WhitelistService.instance(),
    private userService: UserService = UserService.instance(),
  ) {
    makeAutoObservable(this, {
      onChange: action.bound,
      setIsLoading: action.bound,
      setError: action.bound,
      onSubmitUserCredentials: action.bound,
      onSubmitConfirmation: action.bound,
    })
  }
}
