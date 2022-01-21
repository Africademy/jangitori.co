import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'

import { TabButtonProps } from './TabButtonProps'

export type DashboardPageProps = AuthenticatedPageProps<{
  tabs: TabButtonProps[]
}>
