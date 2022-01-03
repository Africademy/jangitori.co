import { useRouter } from 'next/router'

import { createLogger } from '@/common/utils/logging/logger'
import { EmailPasswordCreds } from '@/modules/auth/types'
import { routes } from '@/modules/lib/routes'
import { useMobXStore } from '@/modules/mobx/useMobXStore'
import { useServices } from '@/modules/services'

const AuthFormCard = dynamic(() => import('./AuthForm/AuthFormCard'))
import dynamic from 'next/dynamic'

import { useRootStore } from '@/modules/stores/useRootStore'

import { AuthFormVM } from './AuthForm/AuthFormVM'
import { AuthPageProps } from './types'

const fileLabel = 'layouts/auth/LoginPage'
const logger = createLogger({ fileLabel })

const LoginPageCopy = {
  title: 'Sign in',
  question: "Don't have an account?",
  action: 'Sign up.',
  actionHref: routes.authPage('signup'),
}

const LoginPage: React.FC<AuthPageProps> = () => {
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
      const newRoute = routes.dashboardPage(account.role, 'overview')
      logger.info(
        `✅ logged in account for email ${account.email}. Redirecting to ${newRoute}`,
      )
      authStore.setSession(session)
      authStore.setAccount(account)
      router.push(newRoute)
    } catch (err) {
      authFormVM.setError((err as Error).message)
    } finally {
      authFormVM.setIsLoading(false)
    }
  }

  return (
    <AuthFormCard
      copy={LoginPageCopy}
      vm={authFormVM}
      onSubmit={handleSubmit}
    />
  )
}

export default LoginPage
