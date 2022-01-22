import { useRouter } from 'next/router'

import { useMobXStore } from '@/lib/mobx/useMobXStore'
import { routes } from '@/lib/routes'
import { EmailPasswordCreds } from '@/modules/auth/types'
import { useRootStore, useServices } from '@/modules/stores'

import { AuthFormVM } from '../AuthFormVM'
import { AuthPageProps } from '../types'
import LoginForm from './LoginForm'

const LoginPageCopy = {
  title: 'Sign in',
  question: "Don't have an account?",
  action: 'Sign up.',
  actionHref: routes.authPage('signup'),
}

export const LoginPage: React.FC<AuthPageProps> = () => {
  const { authStore } = useRootStore()
  const router = useRouter()
  const { auth: authService, account: accountService } = useServices(
    'auth',
    'account',
  )

  const authFormVM = useMobXStore(() => new AuthFormVM())

  async function handleSubmit(formData: EmailPasswordCreds) {
    try {
      authFormVM.setError(null)
      authFormVM.setIsLoading(true)
      const { authUser, session } = await authService.signIn(formData)
      const account = await accountService.getAccount(authUser.id)
      authStore.setSession(session)
      authStore.setAccount(account)
      router.push(routes.dashboardPage(account.role, 'overview'))
    } catch (error) {
      alert((error as Error).message)
      authFormVM.setError((error as Error).message)
    } finally {
      authFormVM.setIsLoading(false)
    }
  }

  return (
    <LoginForm copy={LoginPageCopy} vm={authFormVM} onSubmit={handleSubmit} />
  )
}
