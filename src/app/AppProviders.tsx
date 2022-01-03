import dynamic from 'next/dynamic'
import { SWRConfig, SWRConfiguration } from 'swr'

const ServicesProvider = dynamic(
  () => import('@/modules/services/services-context'),
)
const RootStoreProvider = dynamic(
  () => import('@/modules/stores/RootStore/RootStoreProvider'),
)

import { ChakraProvider } from '@chakra-ui/provider'

import { fetcher } from '@/app/fetcher'
import { theme } from '@/modules/theme/theme'

const GlobalStyles = dynamic(() => import('@/modules/theme/GlobalStyles'))

export const defaultSWRConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
}

function AppProviders({ children }) {
  return (
    <ServicesProvider>
      <RootStoreProvider>
        <ChakraProvider resetCSS theme={theme}>
          <GlobalStyles />
          <SWRConfig value={{ fetcher, ...defaultSWRConfig }}>
            {children}
          </SWRConfig>
        </ChakraProvider>
      </RootStoreProvider>
    </ServicesProvider>
  )
}

export default AppProviders
