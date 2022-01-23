import { action, makeAutoObservable } from 'mobx'
import Router from 'next/router'

import { AccountUpdateData } from '@/data/models/account'
import { createLogger } from '@/lib/logger'
import { routes } from '@/lib/routes'
import { waitFor } from '@/lib/waitFor'
import { AccountService } from '@/modules/accounts/AccountService'
import { AuthStore } from '@/modules/auth/AuthStore'
import { EmailPasswordCreds } from '@/modules/auth/types'

import { AuthService } from '../AuthService'
import { UnauthorizedUserCredentialsError } from './signUpErrors'

const fileLabel = 'modules/auth/SignUpPage/SignUpStore'
const logger = createLogger({ fileLabel })

export enum SignUpStep {
  Auth,
  Confirm,
}
export class SignUpStore {
  authCreds: EmailPasswordCreds = { email: '', password: '' }
  initialAccount: Partial<AccountUpdateData> = {}

  currentStep: SignUpStep = SignUpStep.Auth
  error: string | null = null
  isLoading = false

  get isConfirmDisabled(): boolean {
    return (
      !Object.values(this.authCreds).every(Boolean) ||
      !Object.values(this.initialAccount).every(Boolean)
    )
  }

  onChange(field: keyof EmailPasswordCreds, value: string) {
    this.authCreds[field] = value
  }

  setInitialAccountInfo(value: Partial<AccountUpdateData>) {
    this.initialAccount = value
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
      /* Get existing account data */
      const initialAccount = await this.accountService.getAccountByEmail(email)
      if (!initialAccount) throw new UnauthorizedUserCredentialsError()
      /* Check if user is already registered */
      if (initialAccount.uid !== null) {
        throw new Error('Already registered an account for this email.')
      }

      this.setInitialAccountInfo(initialAccount)
      this.currentStep += 1
    } catch (error) {
      this.handleError(error)
    } finally {
      this.setIsLoading(false)
    }
  }

  async onSubmitConfirmation(event: React.FormEvent) {
    event.preventDefault()

    const formData = this.authCreds
    const initialAccount = this.initialAccount

    this.setError(null)
    this.setIsLoading(true)
    try {
      /* Register account with email and password */
      const authUser = await this.authService.signUp(formData)
      logger.info(`✅ registered account for email ${formData.email}`)
      await waitFor(500)

      /* Write any changes to account info to DB */
      const updatedAccount = await this.accountService.updateAccountByEmail(
        formData.email,
        {
          ...initialAccount,
          uid: authUser.id,
        },
      )

      this.authStore.setAccount(updatedAccount)
      Router.router?.push(routes.dashboardPage(updatedAccount.role, 'overview'))
    } catch (error) {
      this.handleError(error)
    } finally {
      this.setIsLoading(false)
    }
  }

  constructor(
    private authStore: AuthStore,
    private authService: AuthService = AuthService.instance(),
    private accountService: AccountService = AccountService.instance(),
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
