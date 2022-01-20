import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { TabKey } from '@/modules/dashboard/tabs'

export type DashboardPageProps = AuthenticatedPageProps<{ tabKey: TabKey }>
