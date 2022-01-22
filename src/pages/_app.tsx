import '@/modules/css/global.css'

import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { SWRConfig, SWRConfiguration } from 'swr'

import { MyAppProps } from '@/app/MyAppProps'

const AppLayout = dynamic(() => import('@/app/AppLayout'))
const AuthListener = dynamic(() => import('@/modules/auth/AuthListener'))

const RootStoreProvider = dynamic(
  () => import('@/modules/stores/RootStoreProvider'),
)

import { ChakraProvider } from '@chakra-ui/provider'

import { fetcher } from '@/lib/fetcher'
import { theme } from '@/modules/emotion/theme'

const GlobalStyles = dynamic(() => import('@/modules/emotion/GlobalStyles'))

const defaultSWRConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
}

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page)

  return (
    <RootStoreProvider>
      <ChakraProvider resetCSS theme={theme}>
        <GlobalStyles />
        <SWRConfig value={{ fetcher, ...defaultSWRConfig }}>
          <AuthListener>
            <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
          </AuthListener>
        </SWRConfig>
      </ChakraProvider>
    </RootStoreProvider>
  )
}
