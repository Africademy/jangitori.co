import Sentry from '@sentry/nextjs'
import { useRouter } from 'next/router'

import { createLogger } from '@/lib/logger'
import { useMobXStore } from '@/lib/mobx/useMobXStore'
import { routes } from '@/lib/routes'
import { EmailPasswordCreds } from '@/modules/auth/types'

const AuthFormCard = dynamic(() => import('./AuthForm/AuthFormCard'))
import dynamic from 'next/dynamic'

import { useRootStore, useServices } from '@/modules/stores'

import { AuthFormVM } from './AuthForm/AuthFormVM'
import { AuthPageProps } from './types'

const fileLabel = 'modules/auth/LoginPage'
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
    } catch (error) {
      Sentry.captureException(error)
      authFormVM.setError((error as Error).message)
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
