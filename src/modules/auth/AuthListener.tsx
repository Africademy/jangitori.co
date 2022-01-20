import { useMountEffect } from '@react-hookz/web'
import { when } from 'mobx'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import { useRootStore } from '@/app/appContext'
import { createLogger } from '@/lib/logger'
import { isAuthRequiredPathname, routes } from '@/lib/routes'
import supabase from '@/lib/supabase'
import updateAuthCookie from '@/modules/auth/updateAuthCookie'
import { getTabKeyForIndex } from '@/modules/dashboard/tabs'

const logger = createLogger({ fileLabel: 'app/AuthListener' })

export interface AuthListenerProps {
  children: ReactNode
}

const AuthListener = function AuthListener({ children }: AuthListenerProps) {
  const router = useRouter()
  const { authStore } = useRootStore()

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
      () => authStore.account !== null,
      () => {
        const isAuthRequiredPath = isAuthRequiredPathname(router.pathname)

        if (!isAuthRequiredPath) {
          router.push(
            routes.dashboardPage(authStore.account!.role, getTabKeyForIndex(0)),
          )
        }
      },
    ),
  )

  useMountEffect(() =>
    when(
      () => authStore.account === null,
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
