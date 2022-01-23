import { action, makeAutoObservable } from 'mobx'

import { WhitelistService } from '@/data/whitelists/whitelistService'
import { logger } from '@/infra/logger'
import { EmailPasswordCreds } from '@/modules/auth/types'

import { RequestStore } from './RequestStore'
import { UnauthorizedUserCredentialsError } from './signUpErrors'
import { SignUpVM } from './SignUpVM'

export class SubmitCredsVM {
  request: RequestStore = new RequestStore()

  handleError(error: unknown) {
    logger.error('❌ Error: ' + (error as Error).message)
    alert((error as Error).message)
    this.request.setError((error as Error).message)
  }

  async onSubmitCreds(emailPasswordCreds: EmailPasswordCreds) {
    const { email } = emailPasswordCreds

    this.request.start()
    try {
      /* Get existing user data */
      const whitelist = await this.whitelistService.findWhitelist({
        email,
      })
      if (!whitelist) throw new UnauthorizedUserCredentialsError()

      this.signUpVM.setInitialUser(whitelist)
      this.signUpVM.setEmailPasswordCreds(emailPasswordCreds)
      this.signUpVM.stepper.increment()
    } catch (error) {
      this.handleError(error)
    } finally {
      this.request.setBusy(false)
    }
  }

  constructor(
    private signUpVM: SignUpVM,
    private whitelistService: WhitelistService = WhitelistService.instance(),
  ) {
    makeAutoObservable(this, {
      onSubmitCreds: action.bound,
    })
  }
}
