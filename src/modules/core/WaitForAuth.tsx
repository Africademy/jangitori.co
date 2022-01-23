import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'
import React from 'react'

import { useRootStore } from '@/modules/stores'

const LoadingScreen = dynamic(() => import('@/ui/components/LoadingScreen'))

export interface WaitForAuthProps {
  children: React.ReactNode
}

export const WaitForAuth = observer(function WaitForAuth({ children }) {
  const { authStore } = useRootStore()

  if (!authStore.user) return <LoadingScreen />

  return <>{children}</>
})
