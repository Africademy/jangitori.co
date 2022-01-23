import { observer } from 'mobx-react-lite'

import { User } from '@/data/models/user'
import { useMobXStore } from '@/lib/mobx/useMobXStore'
import { waitFor } from '@/lib/waitFor'
import AuthForm from '@/modules/auth/AuthForm'
import { EmailPasswordCreds } from '@/modules/auth/types'
import { useAuthService, useAuthStore, useUserService } from '@/modules/stores'
import { LoadingVStack } from '@/ui/components/LoadingVStack'

import { ConfirmUserInfo } from './ConfirmUserInfo'
import { SignUpAuthFormCopy, SignUpSteps } from './constants'
import { SignUpStore } from './SignUpStore'
import { UserInfo } from './types'
import { useStepper } from './useStepper'

export const SignUp = observer(function SignUp({
  onSuccess,
}: {
  onSuccess: (user: User) => void
}) {
  const authService = useAuthService()
  const userService = useUserService()
  const authStore = useAuthStore()

  const signUpStore = useMobXStore(() => new SignUpStore(authStore))

  const { step, next } = useStepper([
    SignUpSteps.Auth,
    SignUpSteps.Confirm,
  ] as const)

  const handleSubmitAuthForm = (data: EmailPasswordCreds) => {
    signUpStore.setEmailPasswordCreds(data)
    next()
  }

  if (step === SignUpSteps.Auth) {
    return (
      <AuthForm copy={SignUpAuthFormCopy} onSubmit={handleSubmitAuthForm} />
    )
  }

  const handleConfirmUserInfo = async (userInfo: UserInfo) => {
    const userToCreate = {
      ...signUpStore.invariantInitialUser,
      ...userInfo,
      updatedAt: new Date().toISOString(),
    }

    signUpStore.setError(null)
    signUpStore.setIsLoading(true)
    try {
      /* Register user with email and password */
      const { authUser } = await authService
        .signUp(signUpStore.emailPasswordCreds)
        .then(async (res) => {
          await waitFor(300)
          return res
        })

      /* Write any changes to user info to DB */
      const user = await userService.createUser({
        uid: authUser.id,
        ...userToCreate,
      })

      onSuccess(user)
    } catch (error) {
      signUpStore.handleError(error)
      signUpStore.setIsLoading(false)
    }
  }

  if (!signUpStore.userInfo) return <LoadingVStack />

  return (
    <ConfirmUserInfo
      userInfo={signUpStore.userInfo}
      onConfirm={handleConfirmUserInfo}
    />
  )
})
