import dynamic from 'next/dynamic'
import { SWRConfig, SWRConfiguration } from 'swr'

const RootStoreProvider = dynamic(() => import('./RootStoreProvider'))

import { ChakraProvider } from '@chakra-ui/provider'

import { theme } from '@/app/theme/theme'
import { fetcher } from '@/lib/fetcher'

const GlobalStyles = dynamic(() => import('@/app/theme/GlobalStyles'))

export const defaultSWRConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
}

function AppProviders({ children }) {
  return (
    <RootStoreProvider>
      <ChakraProvider resetCSS theme={theme}>
        <GlobalStyles />
        <SWRConfig value={{ fetcher, ...defaultSWRConfig }}>
          {children}
        </SWRConfig>
      </ChakraProvider>
    </RootStoreProvider>
  )
}

export default AppProviders
