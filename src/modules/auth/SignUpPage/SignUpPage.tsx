import { observer } from 'mobx-react-lite'

import { useMobXStore } from '@/lib/mobx/useMobXStore'
import AuthForm from '@/modules/auth/AuthForm'
import { useAuthStore } from '@/modules/stores'

import { ConfirmInfo } from './ConfirmInfo'
import { SignUpSteps, SubmitCredsCopy } from './constants'
import { SignUpVM } from './SignUpVM'

export const SignUpPage = observer(function SignUpPage() {
  const authStore = useAuthStore()

  const vm = useMobXStore(() => new SignUpVM(authStore))

  if (vm.stepper.step === SignUpSteps.Auth) {
    return (
      <AuthForm
        copy={SubmitCredsCopy}
        vm={vm.submitCredsVM}
        onSubmit={vm.onSubmitCreds}
      />
    )
  }

  return <ConfirmInfo vm={vm.confirmInfoVM} onConfirm={vm.onConfirmInfo} />
})
