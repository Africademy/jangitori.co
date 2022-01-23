import '@/modules/css/global.css'

import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import { CoreAppProps } from '@/app/CoreAppProps'

const CoreLayout = dynamic(() => import('@/app/CoreLayout'))
const AuthListener = dynamic(() => import('@/modules/auth/AuthListener'))
const GoogleMapsProvider = dynamic(
  () => import('@/modules/googleMaps/GoogleMapsProvider'),
)

const RootStoreProvider = dynamic(
  () => import('@/modules/stores/RootStoreProvider'),
)

import { ChakraProvider } from '@chakra-ui/provider'

import { theme } from '@/modules/theme/theme'

const GlobalStyles = dynamic(() => import('@/modules/theme/GlobalStyles'))

export default function CoreApp({ Component, pageProps }: CoreAppProps) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page)

  return (
    <ChakraProvider resetCSS theme={theme}>
      <GlobalStyles />
      <RootStoreProvider>
        <AuthListener>
          <CoreLayout>
            <GoogleMapsProvider>
              {getLayout(<Component {...pageProps} />)}
            </GoogleMapsProvider>
          </CoreLayout>
        </AuthListener>
      </RootStoreProvider>
    </ChakraProvider>
  )
}
