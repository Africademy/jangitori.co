import { Container, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'

const OverviewPage = dynamic(() => import('@/layouts/dashboard/OverviewPage'))

import { css } from '@emotion/react'

const StyledTab = dynamic(() => import('@/ui/components/StyledTab'))

import { RoleIDs } from '@/db/models/Role'
import { DashboardPageProps } from '@/modules/dashboard/DashboardPageProps'
import DashboardStore from '@/modules/dashboard/DashboardStore'
import { tabLabels } from '@/modules/dashboard/tabs'
import { useSyncTabStateWithRoute } from '@/modules/dashboard/useSyncTabStateWithRoute'
import { LocalStoreProvider } from '@/modules/lib/mobx/LocalStoreProvider'
import { useMobXStore } from '@/modules/lib/mobx/useMobXStore'
import { only } from '@/ui/utils/breakpoints'

const TimesheetsView = dynamic(
  () => import('@/layouts/dashboard/TimesheetsView'),
)

export const AdminDashboardPage = observer(function AdminDashboardPage(
  props: DashboardPageProps,
) {
  const dashboardStore = useMobXStore(
    () =>
      new DashboardStore({
        role: RoleIDs.Employee,
        initialTabKey: props.tabKey,
      }),
  )

  useSyncTabStateWithRoute(
    () => dashboardStore.tabKey,
    dashboardStore.setTabKey,
  )

  return (
    <LocalStoreProvider localStore={dashboardStore}>
      <Container maxW="100vw" px={0}>
        <Container
          maxW="100%"
          css={css`
            min-width: 80vw;
            ${only('mobile')} {
              min-width: 100vw;
              padding: 0;
            }
          `}
        >
          <Tabs
            isLazy
            onChange={dashboardStore.setTab}
            index={dashboardStore.tabIndex}
            colorScheme="messenger"
          >
            <TabList>
              {tabs.map((tab, i) => (
                <StyledTab id={tab.id} key={tab.id}>
                  {tab.label}
                </StyledTab>
              ))}
            </TabList>
            <TabPanels>
              <TabPanel>
                <OverviewPage {...props} />
              </TabPanel>
              <TabPanel>
                <TimesheetsView {...props} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Container>
    </LocalStoreProvider>
  )
})

interface TabButtonProps {
  id: string
  label: string
}

const tabs: TabButtonProps[] = Object.entries(tabLabels).map(
  ([tabKey, tabLabel]) => ({ id: tabKey, label: tabLabel }),
)
