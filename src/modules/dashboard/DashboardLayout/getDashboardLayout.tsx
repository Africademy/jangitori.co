/* eslint-disable react/display-name */
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import DashboardStore from '../DashboardStore'

const DashboardLayout = dynamic(() => import('./DashboardLayout'))

export const getDashboardLayout =
  (initStore: () => DashboardStore) => (page: ReactElement) => {
    return <DashboardLayout initStore={initStore}>{page}</DashboardLayout>
  }
