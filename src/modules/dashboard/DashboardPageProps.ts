import { AuthenticatedPageProps } from '@/layouts/core/types/AuthenticatedPageProps'
import { TabKey } from '@/modules/dashboard/tabs'

export type DashboardPageProps = AuthenticatedPageProps<{ tabKey: TabKey }>
