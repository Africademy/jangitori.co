import { useRouter } from 'next/router'

import { FormStore } from '@/lib/mobx/FormStore'
import { useMobXStore } from '@/lib/mobx/useMobXStore'
import { routes } from '@/lib/routes'
import AuthForm from '@/modules/auth/AuthForm'
import { initEmailPasswordCreds } from '@/modules/auth/helpers'
import { AuthPageProps, EmailPasswordCreds } from '@/modules/auth/types'
import { useRootStore, useServices } from '@/modules/stores'

const LoginPageCopy = {
  title: 'Sign in',
  question: "Don't have an account?",
  action: 'Sign up.',
  actionHref: routes.authPage('signup'),
}

export const LoginPage: React.FC<AuthPageProps> = () => {
  const { authStore } = useRootStore()
  const router = useRouter()
  const { auth: authService, user: userService } = useServices()

  const authFormVM = useMobXStore(
    () =>
      new FormStore<EmailPasswordCreds>(initEmailPasswordCreds(), handleSubmit),
  )

  async function handleSubmit(formData: EmailPasswordCreds) {
    const { authUser, session } = await authService.signIn(formData)
    const user = await userService.getUser({ id: authUser.id })
    authStore.setSession(session)
    authStore.setUser(user)
    router.push(routes.dashboardPage(user.role, 'overview'))
  }

  return <AuthForm copy={LoginPageCopy} vm={authFormVM} />
}
