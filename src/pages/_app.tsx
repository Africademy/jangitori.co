import '@/modules/css/global.css'

import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import { MyAppProps } from '@/app/MyAppProps'

const AppLayout = dynamic(() => import('@/app/AppLayout'))
const AuthListener = dynamic(() => import('@/modules/auth/AuthListener'))
const GoogleMapsProvider = dynamic(
  () => import('@/modules/googleMaps/GoogleMapsProvider'),
)

const RootStoreProvider = dynamic(
  () => import('@/modules/stores/RootStoreProvider'),
)

import { ChakraProvider } from '@chakra-ui/provider'

import { theme } from '@/modules/emotion/theme'

const GlobalStyles = dynamic(() => import('@/modules/emotion/GlobalStyles'))

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page)

  return (
    <RootStoreProvider>
      <ChakraProvider resetCSS theme={theme}>
        <GlobalStyles />
        <AuthListener>
          <AppLayout>
            <GoogleMapsProvider>
              {getLayout(<Component {...pageProps} />)}
            </GoogleMapsProvider>
          </AppLayout>
        </AuthListener>
      </ChakraProvider>
    </RootStoreProvider>
  )
}
