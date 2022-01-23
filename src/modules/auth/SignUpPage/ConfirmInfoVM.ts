import { action, makeAutoObservable } from 'mobx'

import { UserService } from '@/data/users/userService'
import { logger } from '@/infra/logger'
import { waitFor } from '@/lib/waitFor'

import { AuthService } from '../AuthService'
import { UserInfo } from '../types'
import { RequestStore } from './RequestStore'
import { SignUpVM } from './SignUpVM'

export class ConfirmInfoVM {
  request: RequestStore = new RequestStore()

  get userInfo(): UserInfo {
    return this.signUpVM.invariantUserInfo
  }

  handleError(error: unknown) {
    logger.error('❌ Error: ' + (error as Error).message)
    alert((error as Error).message)
    this.request.setError(error)
  }

  async onConfirmInfo(userInfo: UserInfo) {
    const userToCreate = {
      ...this.signUpVM.invariantInitialUser,
      ...userInfo,
      updatedAt: new Date().toISOString(),
    }

    this.request.setError(null)
    this.request.setBusy(true)
    try {
      /* Register user with email and password */
      const { authUser } = await this.authService
        .signUp(this.signUpVM.emailPasswordCreds)
        .then(async (res) => {
          await waitFor(300)
          return res
        })

      /* Write any changes to user info to DB */
      const user = await this.userService.createUser({
        uid: authUser.id,
        ...userToCreate,
      })

      this.signUpVM.onSuccess(user)
    } catch (error) {
      this.handleError(error)
      this.request.setBusy(false)
    }
  }

  constructor(
    private signUpVM: SignUpVM,
    private authService: AuthService = AuthService.instance(),
    private userService: UserService = UserService.instance(),
  ) {
    makeAutoObservable(this, { onConfirmInfo: action.bound })
  }
}
