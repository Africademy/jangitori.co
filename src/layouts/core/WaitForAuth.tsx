import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'
import React from 'react'

import { useRootStore } from '@/app/appContext'

const LoadingScreen = dynamic(() => import('@/ui/LoadingScreen'))

export interface WaitForAuthProps {
  children: React.ReactNode
}

export const WaitForAuth = observer(function WaitForAuth({ children }) {
  const { authStore } = useRootStore()

  if (!authStore.account) return <LoadingScreen />

  return <>{children}</>
})
