import { observer } from 'mobx-react-lite'

import { useMobXStore } from '@/lib/mobx/useMobXStore'
import { useAuthStore } from '@/modules/stores'
import LoadingStack from '@/ui/components/LoadingStack'

import AuthForm from '../AuthForm'
import { ConfirmInfo } from './ConfirmInfo'
import { SignUpAuthFormCopy, SignUpSteps } from './constants'
import { SignUpStore } from './SignUpStore'

export const SignUpPage = observer(function SignUpPage() {
  const authStore = useAuthStore()

  const vm = useMobXStore(() => new SignUpStore(authStore))

  if (vm.stepper.step === SignUpSteps.Auth) {
    return <AuthForm copy={SignUpAuthFormCopy} onSubmit={vm.onSubmitCreds} />
  }

  if (!vm.userInfo) return <LoadingStack />

  return <ConfirmInfo userInfo={vm.userInfo} onConfirm={vm.onConfirmInfo} />
})
