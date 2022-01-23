import {
  AppInitialProps as NextAppInitialProps,
  AppProps as NextAppProps,
} from 'next/app'

import { NextPageWithLayout } from '@/modules/core/types/NextPagePropsWithLayout'

export interface CoreAppInitialProps extends NextAppInitialProps {
  initialState: any
}

export type CoreAppProps = NextAppProps & {
  Component: NextPageWithLayout
}
