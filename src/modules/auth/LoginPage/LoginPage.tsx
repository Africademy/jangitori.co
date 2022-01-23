import { useRouter } from 'next/router'

import { useMobXStore } from '@/lib/mobx/useMobXStore'
import { routes } from '@/lib/routes'
import AuthForm from '@/modules/auth/AuthForm'
import { AuthFormVM } from '@/modules/auth/AuthFormVM'
import { EmailPasswordCreds } from '@/modules/auth/types'
import { AuthPageProps } from '@/modules/auth/types'
import { useRootStore, useServices } from '@/modules/stores'

const LoginPageCopy = {
  title: 'Sign in',
  question: "Don't have an user?",
  action: 'Sign up.',
  actionHref: routes.authPage('signup'),
}

export const LoginPage: React.FC<AuthPageProps> = () => {
  const { authStore } = useRootStore()
  const router = useRouter()
  const { auth: authService, user: userService } = useServices()

  const authFormVM = useMobXStore(() => new AuthFormVM())

  async function handleSubmit(formData: EmailPasswordCreds) {
    try {
      authFormVM.setError(null)
      authFormVM.setBusy(true)
      const { authUser, session } = await authService.signIn(formData)
      const user = await userService.getUser({ uid: authUser.id })
      authStore.setSession(session)
      authStore.setUser(user)
      router.push(routes.dashboardPage(user.role, 'overview'))
    } catch (error) {
      alert((error as Error).message)
      authFormVM.setError((error as Error).message)
    } finally {
      authFormVM.setBusy(false)
    }
  }

  return (
    <AuthForm copy={LoginPageCopy} vm={authFormVM} onSubmit={handleSubmit} />
  )
}
