import { useRouter } from 'next/router'

import { User } from '@/data/models/user'
import { routes } from '@/lib/routes'
import { useAuthStore } from '@/modules/stores'

import { SignUp } from './SignUp'

export const SignUpPage = function SignUpPage() {
  const authStore = useAuthStore()

  const router = useRouter()

  const handleSuccess = (user: User) => {
    authStore.setUser(user)
    router.push(routes.dashboardPage(user.role, 'overview'))
  }

  return <SignUp onSuccess={handleSuccess} />
}
