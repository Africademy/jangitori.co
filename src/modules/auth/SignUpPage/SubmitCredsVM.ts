import { action, makeAutoObservable } from 'mobx'

import { UserService } from '@/data/users/userService'
import { WhitelistService } from '@/data/whitelists/whitelistService'
import { logger } from '@/infra/logger'
import { EmailPasswordCreds } from '@/modules/auth/types'
import { FormStore } from '@/modules/form/FormStore'

import { RequestStore } from './RequestStore'
import { UnauthorizedUserCredentialsError } from './signUpErrors'
import { SignUpVM } from './SignUpVM'

export class SubmitCredsVM {
  request: RequestStore = new RequestStore()
  form: FormStore<EmailPasswordCreds> = new FormStore(
    { email: '', password: '' },
    this.onSubmit,
  )

  async onSubmit(emailPasswordCreds: EmailPasswordCreds) {
    const { email } = emailPasswordCreds
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

    this.signUpVM.setInitialUser(whitelist)
    this.signUpVM.setEmailPasswordCreds(emailPasswordCreds)
    this.signUpVM.stepper.increment()
  }

  constructor(
    private signUpVM: SignUpVM,
    private whitelistService: WhitelistService = WhitelistService.instance(),
    private userService: UserService = UserService.instance(),
  ) {
    makeAutoObservable(this, {
      onSubmit: action.bound,
    })
  }
}
