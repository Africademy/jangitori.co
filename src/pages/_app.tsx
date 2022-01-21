import '@/modules/css/global.css'

import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import { MyAppProps } from '@/app/MyAppProps'

const AppLayout = dynamic(() => import('@/app/AppLayout'))
const AuthListener = dynamic(() => import('@/modules/auth/AuthListener'))
const AppProviders = dynamic(() => import('@/app/AppProviders'))

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page)

  return (
    <AppProviders>
      <AuthListener>
        <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
      </AuthListener>
    </AppProviders>
  )
}
