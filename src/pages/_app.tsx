import '@/modules/theme/styles/global.css'

import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { Toaster } from 'react-hot-toast'

import { MyAppProps } from '@/app/MyAppProps'
import { rootStoreInstance } from '@/modules/stores'

const AppLayout = dynamic(() => import('@/app/AppLayout'))
const AuthListener = dynamic(() => import('@/modules/auth/AuthListener'))
const AppProviders = dynamic(() => import('@/app/AppProviders'))

const TOAST_DURATION = 1750

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page)

  return (
    <AppProviders>
      <AuthListener>
        <AppLayout>
          {getLayout(<Component {...pageProps} store={rootStoreInstance} />)}
          <Toaster
            position="bottom-left"
            toastOptions={{ duration: TOAST_DURATION }}
          />
        </AppLayout>
      </AuthListener>
    </AppProviders>
  )
}
