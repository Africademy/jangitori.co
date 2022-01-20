import dynamic from 'next/dynamic'
import { SWRConfig, SWRConfiguration } from 'swr'

const RootStoreProvider = dynamic(
  () => import('@/modules/stores/RootStoreProvider'),
)

import { ChakraProvider } from '@chakra-ui/provider'

import { fetcher } from '@/lib/fetcher'
import { theme } from '@/modules/theme/theme'

const GlobalStyles = dynamic(() => import('@/modules/theme/GlobalStyles'))

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
