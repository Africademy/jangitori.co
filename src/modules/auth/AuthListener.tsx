import { useMountEffect } from '@react-hookz/web'
import { when } from 'mobx'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import { logger } from '@/infra/logger'
import { isAuthRequiredPathname, routes } from '@/lib/routes'
import supabase from '@/lib/supabase'
import updateAuthCookie from '@/modules/auth/updateAuthCookie'
import { useAuthStore } from '@/modules/stores'

export interface AuthListenerProps {
  children: ReactNode
}

const AuthListener = function AuthListener({ children }: AuthListenerProps) {
  const router = useRouter()
  const authStore = useAuthStore()

  useMountEffect(() => {
    const listener = supabase.auth.onAuthStateChange(async (event, session) => {
      logger.info(`👋 ${event}`)

      await updateAuthCookie(event, session)
      authStore.setSession(session)
    })

    return () => listener.data?.unsubscribe()
  })

  useMountEffect(() =>
    when(
      () => authStore.user !== null,
      () => {
        const isAuthRequiredPath = isAuthRequiredPathname(router.pathname)

        if (!isAuthRequiredPath) {
          router.push(routes.dashboardPage(authStore.user!.role, 'overview'))
        }
      },
    ),
  )

  useMountEffect(() =>
    when(
      () => authStore.user === null,
      () => {
        const isAuthRequiredPath = isAuthRequiredPathname(router.pathname)

        if (isAuthRequiredPath) {
          router.push(routes.authPage('login'))
        }
      },
    ),
  )

  return <>{children}</>
}

export default AuthListener
