import { SWRConfig, SWRConfiguration } from 'swr'

const AuthListener = dynamic(() => import('@/app/AuthListener'))
import dynamic from 'next/dynamic'

const ServicesProvider = dynamic(
  () => import('@/modules/services/services-context'),
)
const RootStoreProvider = dynamic(
  () => import('@/modules/stores/RootStore/RootStoreProvider'),
)

import { ChakraProvider } from '@chakra-ui/provider'

import { fetcher } from '@/app/fetcher'
import { theme } from '@/app/theme/theme'

const GlobalStyles = dynamic(() => import('@/app/theme/GlobalStyles'))

export const defaultSWRConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
}

function AppProviders({ children }) {
  return (
    <ServicesProvider>
      <RootStoreProvider>
        <AuthListener>
          <ChakraProvider resetCSS theme={theme}>
            <GlobalStyles />
            <SWRConfig value={{ fetcher, ...defaultSWRConfig }}>
              {children}
            </SWRConfig>
          </ChakraProvider>
        </AuthListener>
      </RootStoreProvider>
    </ServicesProvider>
  )
}

export default AppProviders
