import {
  AppInitialProps as NextAppInitialProps,
  AppProps as NextAppProps,
} from 'next/app'

import { NextPageWithLayout } from '@/layouts/core/types/NextPagePropsWithLayout'

export interface MyAppInitialProps extends NextAppInitialProps {
  initialState: any
}

export type MyAppProps = NextAppProps & {
  Component: NextPageWithLayout
}
