/* eslint-disable react/display-name */
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

const DashboardLayout = dynamic(() => import('./DashboardLayout'))

export const getDashboardLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>
}
